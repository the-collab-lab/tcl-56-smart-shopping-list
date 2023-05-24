import { sortItems, comparePurchaseUrgency } from '../src/utils';
import { Timestamp } from 'firebase/firestore';

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

// Tests for comparePurchaseUrgency

describe('the comparePurchaseUrgency function receives an array of objects and breaks it up into two separate arrays based on the dateLastPurchased property then concatenates the arrays back together', () => {
	const customFireStoreDate = (dateString) =>
		Timestamp.fromDate(new Date(dateString));

	const getPastDate = (daysToSubtract) => {
		const today = new Date();
		const pastDate = new Date(today.setDate(today.getDate() - daysToSubtract));
		return pastDate;
	};

	it('sorts the data into two groups based on whether the dateLastPurchased property is <= 60 days or not, then puts the groups back together in one array', () => {
		const data = [
			{
				name: 'item2',
				dateLastPurchased: customFireStoreDate(getPastDate(20)),
			},
			{
				name: 'item5',
				dateLastPurchased: customFireStoreDate(getPastDate(77)),
			},
			{
				name: 'item1',
				dateLastPurchased: customFireStoreDate(getPastDate(5)),
			},
			{
				name: 'item3',
				dateLastPurchased: customFireStoreDate(getPastDate(60)),
			},
			{
				name: 'item4',
				dateLastPurchased: customFireStoreDate(getPastDate(61)),
			},
			{
				name: 'item6',
				dateLastPurchased: customFireStoreDate(getPastDate(90)),
			},
		];

		const expectedResult = [
			{
				name: 'item1',
				dateLastPurchased: customFireStoreDate(getPastDate(5)),
			},
			{
				name: 'item2',
				dateLastPurchased: customFireStoreDate(getPastDate(20)),
			},
			{
				name: 'item3',
				dateLastPurchased: customFireStoreDate(getPastDate(60)),
			},
			{
				name: 'item4',
				dateLastPurchased: customFireStoreDate(getPastDate(61)),
			},
			{
				name: 'item5',
				dateLastPurchased: customFireStoreDate(getPastDate(77)),
			},
			{
				name: 'item6',
				dateLastPurchased: customFireStoreDate(getPastDate(90)),
			},
		];

		const concatenatedDataMap = comparePurchaseUrgency(data).map(
			(item) => item.name,
		);
		const expectedDataMap = expectedResult.map((item) => item.name);

		expect(concatenatedDataMap).toEqual(expectedDataMap);
	});
});
