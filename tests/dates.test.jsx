import { getDaysBetweenDates } from '../src/utils';

describe('calculates days between dates correctly', () => {
	it('given two consecutive dates, then one day is returned', () => {
		let date1 = new Date('2023-01-01');
		let date2 = new Date('2023-01-02');

		expect(getDaysBetweenDates(date1, date2)).toEqual(1);
	});

	it('given two dates in any order, then the days between returned is always positive', () => {
		let date1 = new Date('2023-01-01');
		let date2 = new Date('2023-01-02');

		expect(getDaysBetweenDates(date2, date1)).toEqual(1);
	});
});
