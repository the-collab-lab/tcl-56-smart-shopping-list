import { getDaysBetweenDates, transformToJSDate } from '../src/utils';
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
