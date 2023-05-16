import { getItemDaysUntilNextPurchase } from '../src/utils';
import { getDaysBetweenDates, transformToJSDate } from '../src/utils';
import { Timestamp } from 'firebase/firestore';

// tests for getItemDaysUntilNextPurchase function

describe('uses getDaysBetweenDates function to calculate number of days between today and the dateNextPurchased property of an item', () => {
	const getNextDate = (daysToAdd) => {
		const today = new Date();
		const nextDate = new Date(today.setDate(today.getDate() + daysToAdd));
		return nextDate;
	};

	it('receives an item with a date property of today and calculates the number of days between today and the received date', () => {
		let item = {
			dateNextPurchased: Timestamp.now(),
		};

		expect(getItemDaysUntilNextPurchase(item)).toEqual(0);
	});
	it('receives an item with a date property 30 days in the future and returns the number of days between today and that date, not counting today', () => {
		let item = {
			dateNextPurchased: Timestamp.fromDate(new Date(getNextDate(30))),
		};

		expect(getItemDaysUntilNextPurchase(item)).toEqual(29);
	});
});
