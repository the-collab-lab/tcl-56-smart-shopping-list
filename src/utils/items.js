import { transformToJSDate, getDaysBetweenDates } from './dates';

export function getItemDaysUntilNextPurchase(item) {
	const today = new Date();
	const nextPurchase = transformToJSDate(item.dateNextPurchased);

	return getDaysBetweenDates(nextPurchase, today);
}

export function getItemDaysSinceLastPurchase(item) {
	const today = new Date();
	const lastPurchase = transformToJSDate(
		item.dateLastPurchased || item.dateCreated,
	);

	return getDaysBetweenDates(lastPurchase, today);
}

export function sortItems(data) {
	return data.sort((a, b) => {
		const currentDate = transformToJSDate(a.dateNextPurchased);
		const nextDate = transformToJSDate(b.dateNextPurchased);

		if (currentDate > nextDate) {
			return 1;
		} else if (currentDate < nextDate) {
			return -1;
		} else {
			return a.name.localeCompare(b.name);
		}
	});
}

export function comparePurchaseUrgency(data) {
	const inactiveItems = sortItems(
		data.filter((item) => {
			return getItemDaysSinceLastPurchase(item) >= 60;
		}),
	);

	const activeItems = sortItems(
		data.filter((item) => {
			return getItemDaysSinceLastPurchase(item) < 60;
		}),
	);

	return [...activeItems, ...inactiveItems];
}
