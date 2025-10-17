export type QueryStep = {
	type: 'query';
	sql: string;
	params: any[] | ((context: any) => any[]);
	context?: (context: any) => object;
};

export type TransformStep = {
	type: 'transform';
	fn: (context: any) => any;
};

export type OkPacket = {
	affectedRows: number;
	insertId: bigint;
	warningStatus: number;
};

export type ChainStep = QueryStep | TransformStep;