import {
	getDaysBetweenDates,
	transformToJSDate,
	getNextPurchaseDate,
	getFutureDate,
} from '../src/utils';
import { Timestamp } from 'firebase/firestore';

// Tests for transformToJSDate

describe('transforms a firestore object into a javascript date object', () => {
	it('receives a firestore date, then converts that date into a javascript date', () => {
		let firestoreDate = new Timestamp();
		let jsDate = firestoreDate.toDate();

		expect(transformToJSDate(firestoreDate)).toEqual(jsDate);
	});
	it('receives a firestore date object, then returns a javascript date object', () => {
		let firestoreDate = new Timestamp();
		let jsDate = firestoreDate.toDate();

		expect(typeof transformToJSDate(firestoreDate)).toEqual(typeof jsDate);
	});
	it('receives a null, then it returns null', () => {
		expect(transformToJSDate(null)).toEqual(null);
	});
});

// Tests for getDaysBetweenDates function
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

describe('calculates the next day to purchase an item and returns a new date', () => {
	it('receives 1 day from today and returns a date 1 day in the future', () => {
		let today = new Date();
		let getDateOfMonth = today.getDate();
		let addedDaystoDate = getDateOfMonth + 1;
		let nextDate = today.setDate(addedDaystoDate);
		nextDate = new Date(nextDate);
		expect(getNextPurchaseDate(1)).toEqual(nextDate);
	});

	it('receives a large number of days from today and returns the correct month for the date', () => {
		let today = new Date();
		let getDateOfMonth = today.getDate();
		let addedDaystoDate = getDateOfMonth + 55;
		let nextDate = today.setDate(addedDaystoDate);
		nextDate = new Date(nextDate);
		expect(getNextPurchaseDate(55)).toEqual(nextDate);
	});

	it('returns the same date if 0 days are passed', () => {
		let today = new Date();
		let getDateOfMonth = today.getDate();
		let addedDaystoDate = getDateOfMonth + 0;
		let nextDate = today.setDate(addedDaystoDate);
		nextDate = new Date(nextDate);
		expect(getNextPurchaseDate(0)).toEqual(nextDate);
	});
});

describe('getFutureDate', () => {
	it('receives a number of days and returns a date offset by that many days', () => {
		expect(getFutureDate(3)).toEqual(new Date(Date.now() + 3 * 86400000));
	});

	it('returns 1 day in the future if 0 days are passed', () => {
		expect(getFutureDate(0)).toEqual(new Date(Date.now() + 0 * 86400000));
	});
});
