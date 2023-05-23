import { transformToJSDate, getDaysBetweenDates } from './dates';

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
			return (
				getDaysBetweenDates(
					transformToJSDate(item.dateLastPurchased || item.dateCreated),
					new Date(),
				) >= 60
			);
		}),
	);

	const activeItems = sortItems(
		data.filter((item) => {
			return (
				getDaysBetweenDates(
					transformToJSDate(item.dateLastPurchased || item.dateCreated),
					new Date(),
				) < 60
			);
		}),
	);

	return [...activeItems, ...inactiveItems];
}
