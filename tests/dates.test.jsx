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

// Tests for getNextPurchaseDate function

describe('calculates the next day to purchase an item and returns a new date', () => {
	const getNextDate = (daysToAdd) => {
		const today = new Date();
		const nextDate = new Date(today.setDate(today.getDate() + daysToAdd));
		return nextDate;
	};

	it('receives 1 day from today and returns a date 1 day in the future', () => {
		const expectedDate = getNextDate(1);
		expect(getNextPurchaseDate(1)).toEqual(expectedDate);
	});

	it('receives a large number of days from today and returns the correct month for the date', () => {
		const expectedDate = getNextDate(55);
		expect(getNextPurchaseDate(55)).toEqual(expectedDate);
	});

	it('returns the same date if 0 days are passed', () => {
		const expectedDate = getNextDate(0);
		expect(getNextPurchaseDate(0)).toEqual(expectedDate);
	});
});

// Tests for getFutureDate function
describe('getFutureDate', () => {
	const ONE_DAY_IN_MILLISECONDS = 86400000;
	const newDateOffsetByNum = (num) =>
		new Date(Date.now() + num * ONE_DAY_IN_MILLISECONDS);

	it('receives a number of days and returns a date offset by that many days', () => {
		expect(getFutureDate(3)).toEqual(newDateOffsetByNum(3));
	});

	it('returns 1 day in the future if 0 days are passed', () => {
		expect(getFutureDate(0)).toEqual(newDateOffsetByNum(0));
	});
});
