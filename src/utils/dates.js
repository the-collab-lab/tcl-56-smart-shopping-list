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

// transforms Firebase date object to JS date object
export function transformToJSDate(date) {
	const jsFullDate = date?.toDate();
	const month = jsFullDate.getMonth();
	const day = jsFullDate.getDate();
	const year = jsFullDate.getFullYear();
	return new Date(year, month, day);
}

/**
 * startDate and endDate are required to be two JavaScript Date objects in order for the compare function to work
 * @param {Date} startDate
 * @param {Date} endDate
 */
export function getDaysBetweenDates(startDate, endDate) {
	let timeDifference = endDate?.getTime() - startDate?.getTime();
	let totalDays = Math.abs(timeDifference / ONE_DAY_IN_MILLISECONDS);
	return Math.floor(totalDays);
}
/**
 * Receives a whole number of days that is estimated from calculateEstimate function
 * Grabs the current date from new Date object and adds the number of days to it
 * Sets a new date and returns it as a JavaScript Date object
 * @param {number} estimatedDays
 * @returns {Date}
 */
export function getNextPurchaseDate(estimatedDays) {
	let today = new Date();
	let getDateOfMonth = today.getDate();
	let addedDaystoDate = getDateOfMonth + estimatedDays;
	let nextDate = today.setDate(addedDaystoDate);
	return new Date(nextDate);
}
