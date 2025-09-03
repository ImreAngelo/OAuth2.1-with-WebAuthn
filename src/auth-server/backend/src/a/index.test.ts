import a from '.';

describe('multiply module', () => {
	test('multiplies 2 * 2 to equal 4', () => {
		expect(a(2, 2)).toBe(4);
	});
});