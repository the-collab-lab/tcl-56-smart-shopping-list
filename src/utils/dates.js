const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

/**
 * presentDate and lastPurchaseDate are required to be two javascript date objects in order for the compare function to work
 * @param {Date} startDate
 * @param {Date} endDate
 */
export function getDaysBetweenDates(startDate, endDate) {
	let timeDifference = endDate.getTime() - startDate.getTime();
	let totalDays = Math.abs(timeDifference / ONE_DAY_IN_MILLISECONDS);
	return Math.floor(totalDays);
}

export function getNextPurchaseDate(estimatedDays) {
	console.log('estimatedDays', estimatedDays);
	let today = new Date();
	console.log('today', today);
	let getDateOfMonth = today.getDate();
	console.log('getDateOfMonth', getDateOfMonth);
	let addedDaystoDate = getDateOfMonth + estimatedDays;
	console.log('addedDaystoDate', addedDaystoDate);
	let today2 = today;
	let nextDate = today2.setDate(addedDaystoDate);
	console.log('nextDate and today', nextDate, today);
	return new Date(nextDate);
}
