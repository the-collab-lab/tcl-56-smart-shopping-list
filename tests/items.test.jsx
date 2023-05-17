import { getItemDaysUntilNextPurchase, sortItems } from '../src/utils';
import { Timestamp } from 'firebase/firestore';

// tests for getItemDaysUntilNextPurchase function

describe('uses getDaysBetweenDates function to calculate number of days between today and the dateNextPurchased property of an item', () => {
	const getNextDate = (daysToAdd) => {
		const today = new Date();
		const nextDate = new Date(today.setDate(today.getDate() + daysToAdd));
		return nextDate;
	};
	it('receives an item with a date property of today and calculates the number of days between today and the received date', () => {
		const item = {
			dateNextPurchased: Timestamp.fromDate(new Date(getNextDate(20))),
		};
		expect(getItemDaysUntilNextPurchase(item)).toEqual(19);
	});
	it('receives an item with a date property 30 days in the future and returns the number of days between today and that date, not counting today', () => {
		let item = {
			dateNextPurchased: Timestamp.fromDate(new Date(getNextDate(30))),
		};
		expect(getItemDaysUntilNextPurchase(item)).toEqual(29);
	});

	it('receives an object and returns a number type', () => {
		const item = {
			dateNextPurchased: Timestamp.now(),
		};
		expect(getItemDaysUntilNextPurchase(item)).toEqual(Number());
	});
});

// test for sortItems function
describe('sortItems', () => {
	const customFireStoreDate = (dateString) =>
		Timestamp.fromDate(new Date(dateString));

	it('sorts the items based on the dateNextPurchased property and name', () => {
		// Create sample data
		const data = [
			{
				name: 'Apple',
				dateNextPurchased: customFireStoreDate('2023-05-15'),
			},
			{
				name: 'Banana',
				dateNextPurchased: customFireStoreDate('2023-05-15'),
			},
			{
				name: 'Ahi-Tuna',
				dateNextPurchased: customFireStoreDate('2023-05-13'),
			},
			{
				name: 'Coffee',
				dateNextPurchased: customFireStoreDate('2023-05-14'),
			},
			{
				name: 'Coconut',
				dateNextPurchased: customFireStoreDate('2023-05-16'),
			},
		];

		// Expected result after sorting
		const expectedResult = [
			{
				name: 'Ahi-Tuna',
				dateNextPurchased: customFireStoreDate('2023-05-13'),
			},
			{
				name: 'Coffee',
				dateNextPurchased: customFireStoreDate('2023-05-14'),
			},
			{
				name: 'Apple',
				dateNextPurchased: customFireStoreDate('2023-05-15'),
			},
			{
				name: 'Banana',
				dateNextPurchased: customFireStoreDate('2023-05-15'),
			},
			{
				name: 'Coconut',
				dateNextPurchased: customFireStoreDate('2023-05-16'),
			},
		];

		// Sort the items
		const sortedItems = sortItems(data);

		// Compare the sorted items with the expected result
		expect(sortedItems).toEqual(expectedResult);
	});
});
