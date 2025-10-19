import { beforeEach, describe, expect, it, vi } from "vitest";

const mockGetConnection = vi.fn();
const mockCreatePool = vi.fn(() => ({
        getConnection: mockGetConnection,
}));

vi.mock("mariadb", () => ({
        createPool: mockCreatePool,
}));

const createConnectionMock = () => ({
        beginTransaction: vi.fn().mockResolvedValue(undefined),
        commit: vi.fn().mockResolvedValue(undefined),
        rollback: vi.fn().mockResolvedValue(undefined),
        release: vi.fn(),
        query: vi.fn(),
});

const loadDatabase = async () => (await import("./index")).default;

describe("Database", () => {
        beforeEach(() => {
                vi.resetModules();
                mockCreatePool.mockClear();
                mockGetConnection.mockReset();
        });

        it("executes query chains with transforms, extra context and commits the transaction", async () => {
                const connection = createConnectionMock();
                connection.query
                        .mockResolvedValueOnce({ rows: [{ id: 1 }], length: 1 })
                        .mockResolvedValueOnce({ affectedRows: 1 });

                mockGetConnection.mockResolvedValue(connection);

                const Database = await loadDatabase();

                const captureTransform = vi.fn((ctx: any) => ({ id: ctx.rows[0].id, meta: ctx.meta }));

                const result = await Database.query("SELECT * FROM table", [])
                        .transform(captureTransform)
                        .query("INSERT INTO table VALUES (?)", (ctx: any) => [ctx.id])
                        .transform((ctx: any) => ctx.affectedRows);

                expect(result).toBe(1);
                expect(captureTransform).toHaveBeenCalledWith(expect.objectContaining({
                        length: 1,
                        rows: [{ id: 1 }]
                }));
                expect(connection.beginTransaction).toHaveBeenCalledTimes(1);
                expect(connection.query).toHaveBeenNthCalledWith(1, "SELECT * FROM table", []);
                expect(connection.query).toHaveBeenNthCalledWith(2, "INSERT INTO table VALUES (?)", [1]);
                expect(connection.commit).toHaveBeenCalledTimes(1);
                expect(connection.release).toHaveBeenCalledTimes(1);
        });

        it("selectOne returns the first item and exists detects rows", async () => {
                const connection = createConnectionMock();
                connection.query.mockResolvedValue({});

                mockGetConnection.mockResolvedValue(connection);

                const Database = await loadDatabase();

                const first = await Database.query("SELECT * FROM items")
                        .transform(() => [{ id: "a" }, { id: "b" }])
                        .selectOne();

                expect(first).toEqual({ id: "a" });

                const exists = await Database.query("SELECT * FROM items WHERE id = ?", ["a"])
                        .transform(() => [{ id: "a" }])
                        .exists();

                const notExists = await Database.query("SELECT * FROM items WHERE id = ?", ["missing"])
                        .transform(() => [])
                        .exists();

                expect(exists).toBe(true);
                expect(notExists).toBe(false);
        });

		it("exists returns false when the context is not an array", async () => {
                const connection = createConnectionMock();
                connection.query.mockResolvedValue({ rows: [] });

                mockGetConnection.mockResolvedValue(connection);

                const Database = await loadDatabase();

                const exists = await Database.query("SELECT 1")
                        .transform(() => ({ foo: "bar" }))
                        .exists();

                expect(exists).toBe(false);
        });

        it("selectOne throws when the context is not an array and lacks an indexed element", async () => {
                const connection = createConnectionMock();
                connection.query.mockResolvedValue({ rows: [] });

                mockGetConnection.mockResolvedValue(connection);

                const Database = await loadDatabase();

                await expect(
                        Database.query("SELECT 1")
                                .transform(() => ({ foo: "bar" }))
                                .selectOne()
                ).rejects.toThrow(".selectOne() called on non-array result");
        });

        it("rolls back the transaction, rejects when a step fails, and triggers catch handlers", async () => {
                const connection = createConnectionMock();
                connection.query
                        .mockResolvedValueOnce({ rows: [] })
                        .mockRejectedValueOnce(new Error("boom"));

                mockGetConnection.mockResolvedValue(connection);

                const Database = await loadDatabase();

                const catchHandler = vi.fn();

                await expect(
                        Database.query("SELECT * FROM table")
                                .query("INSERT INTO table VALUES (?)", [])
                                .catch(catchHandler)
                ).rejects.toThrow("boom");

                expect(connection.beginTransaction).toHaveBeenCalledTimes(1);
                expect(connection.rollback).toHaveBeenCalledTimes(1);
                expect(connection.commit).not.toHaveBeenCalled();
                expect(connection.release).toHaveBeenCalledTimes(1);
                expect(catchHandler).toHaveBeenCalledTimes(1);
                expect(catchHandler.mock.calls[0][0]).toBeInstanceOf(Error);
        });
});