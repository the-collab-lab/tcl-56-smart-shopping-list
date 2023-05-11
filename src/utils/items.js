import { transformToJSDate, getDaysBetweenDates } from './dates';

export function getItemDaysUntilNextPurchase(item) {
	const today = new Date();
	const nextPurchase = transformToJSDate(item.dateNextPurchased);

	return getDaysBetweenDates(nextPurchase, today);
}

export function sortItems(data) {
	return data.sort((a, b) => {
		const daysUntilNextPurchaseA = getItemDaysUntilNextPurchase(a);
		const daysUntilNextPurchaseB = getItemDaysUntilNextPurchase(b);

		return (
			daysUntilNextPurchaseA - daysUntilNextPurchaseB ||
			a.name.localeCompare(b.name)
		);
	});
}
