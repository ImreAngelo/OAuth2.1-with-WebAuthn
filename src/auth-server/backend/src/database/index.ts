import * as mariadb from 'mariadb';
import { ChainStep, OkPacket } from './types';

/**
 * TODO: Handle column-level encryption/decryption
 */
const pool = mariadb.createPool({
	host: process.env.DB_HOST || "database", 
	port: Number(process.env.DB_PORT) || 3306,
	database: process.env.DB_NAME || "authn",
	password: process.env.DB_PASS,
	user: process.env.DB_USER,
	connectionLimit: 5
});

/**
 * A chain of database queries and transformations wrapped in a transaction
 */
export default class Database<T = OkPacket> implements PromiseLike<T> {
	private chain: ChainStep[] = [];
	private hasRun = false;
	private promise: Promise<T>;
	private _resolve!: (value: T | PromiseLike<T>) => void;
	private _reject!: (reason?: any) => void;

	constructor() {
		this.promise = new Promise<T>((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});

		setImmediate(() => {
			if (!this.hasRun) this.run().then(this._resolve).catch(this._reject);
		});
	}

	/**
	 * Creates a new chainable database connection.
	 * 
	 * @returns {Database<T>} A new `Database` instance.
	 */
	static connect<T = any>(): Database<T> {
		return new Database<T>();
	}

	/**
	 * Starts a new query chain with an initial SQL statement and optional parameters.
	 * 
	 * @param {string} sql - The SQL query string to execute.
	 * @param {any[]} [params=[]] - Parameters to bind to the query.
	 * @returns {Database<T>} A new `Database` instance containing the query.
	 */
	static query<T = any>(sql: string, params: any[] = []): Database<T> {
		return new Database<T>().query(sql, params);
	}

	/**
	 * Adds a SQL query step to the chain.
	 * 
	 * @param {string} sql - The SQL query to execute.
	 * @param {any[] | ((context: any) => any[])} params - Parameters for the query, or a function that derives them from the current context.
	 * @param {(context: any) => object} [extraContext] - Optional function to generate additional context to merge into the result.
	 * @returns {Database<TStep>} The updated database chain with the query step.
	 */
	query<TStep = OkPacket>(
		sql: string, 
		params: any[] | ((context: any) => any[]) = [], 
		extraContext?: (context: any) => object
	): Database<TStep> {
		this.chain.push({
			type: 'query',
			sql,
			params,
			context: extraContext
		});
		return this as unknown as Database<TStep>;
	}

	/**
	 * Adds a transformation step to the chain, applying a function to the current context.
	 * 
	 * @param {(context: T) => U} fn - A function that transforms the current context.
	 * @returns {Database<U>} The updated database chain with the transformed context.
	 */
	transform<U>(fn: (context: T) => U): Database<U> {
		this.chain.push({
			type: 'transform',
			fn
		});
		return this as unknown as Database<U>;
	}

	/**
	 * Selects the first element from an array result. Throws if the context is not an array.
	 * 
	 * @returns {Database<U>} The updated database chain with only the first result.
	 */
	selectOne<U = any>(): Database<U> {
		this.chain.push({
			type: 'transform',
			fn: (context: any) => {
				if (Array.isArray(context) || context[0])
					return context[0];

				throw new Error(".selectOne() called on non-array result");
			}
		});
		return this as unknown as Database<U>;
	}

	/**
	 * Checks whether the current context (typically a query result) contains any rows.
	 * 
	 * @returns {Database<boolean>} A new chain step resolving to true or false.
	 */
	exists(): Database<boolean> {
		this.chain.push({
			type: 'transform',
			fn: (context: any) => {
				if (Array.isArray(context)) {
					return context.length > 0;
				}
				// Some MariaDB drivers return resultsets as objects with .length
				if (context && typeof context.length === 'number') {
					return context.length > 0;
				}
				return false;
			}
		});
		return this as unknown as Database<boolean>;
	}

	/**
	 * Executes the chain of queries and transformations, using a database connection and transaction.
	 * 
	 * @returns {Promise<T>} A promise resolving to the final result of the chain.
	 */
	async run(): Promise<T> {
		if (this.hasRun) return this.promise;
		this.hasRun = true;

		let context: any = undefined;
		let conn;

		try {
			conn = await pool.getConnection();
			await conn.beginTransaction();

			for (const step of this.chain) {
				if (step.type === 'query') {
					const sql = step.sql;
					const params = typeof step.params === 'function' ? step.params(context) : step.params;
					const result = await conn.query(sql, params);
					const extra = step.context ? step.context(context) : {};
					
					context = {
						...result,
						...extra
					};

				} else if (step.type === 'transform') {
					context = step.fn(context);
				}
			}

			await conn.commit();
			this._resolve(context);
			return context;

		} catch (err) {
			if (conn) await conn.rollback();
			this._reject(err);
			throw err;

		} finally {
			if (conn) conn.release();
		}
	}

	/**
	 * Attaches a rejection handler to the internal promise for error handling.
	 * 
	 * @param {(reason: any) => void} fn - A function to call if an error occurs during execution.
	 * @returns {this} The database instance for chaining.
	 */
	catch(fn: (reason: any) => void): this {
		this.promise.catch(fn);
		return this;
	}

	/**
	 * Attaches handlers to the internal promise for fulfillment and rejection.
	 * 
	 * @param {((value: T) => TResult1 | PromiseLike<TResult1>)} [onfulfilled] - Called if the promise is fulfilled.
	 * @param {((reason: any) => TResult2 | PromiseLike<TResult2>)} [onrejected] - Called if the promise is rejected.
	 * @returns {Promise<TResult1 | TResult2>} A standard promise.
	 */
	then<TResult1 = T, TResult2 = never>(
		onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
		onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
	): Promise<TResult1 | TResult2> {
		return this.promise.then(onfulfilled, onrejected);
	}
}