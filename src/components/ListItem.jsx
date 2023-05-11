import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';
import {
	getItemDaysUntilNextPurchase,
	getItemDaysSinceLastPurchase,
} from '../utils';

export function ListItem({ item, listId }) {
	const [checked, setChecked] = useState(false);

	const checkItem = (e) => {
		updateItem(listId, item);
	};
	useEffect(() => {
		if (item.dateLastPurchased) {
			const lastPurchasedDate = item.dateLastPurchased.toDate();
			const twentyFourHrs = 24;
			const hoursPlus24 = lastPurchasedDate.getHours() + twentyFourHrs;

			const newDate = new Date(lastPurchasedDate.setHours(hoursPlus24));

			if (newDate > new Date()) {
				setChecked(true);
			}
		}
	}, [checked, item.dateLastPurchased]);

	const purchaseUrgencyMessage = (item) => {
		if (getItemDaysUntilNextPurchase(item) <= 7) {
			return 'Soon!';
		} else if (
			getItemDaysUntilNextPurchase(item) > 7 &&
			getItemDaysUntilNextPurchase(item) < 30
		) {
			return "You've got a bit of time";
		} else if (
			getItemDaysUntilNextPurchase(item) >= 30 &&
			getItemDaysUntilNextPurchase(item) < 60
		) {
			return 'Not for a while';
		} else if (getItemDaysSinceLastPurchase(item) > 60) {
			return "You don't seem to be buying this anymore";
		} else {
			return "You haven't purchased this item yet!";
		}
	};

	return (
		<li className="ListItem">
			<label htmlFor={item.id}>
				{checked ? (
					<input type="checkbox" id={item.id} onChange={checkItem} checked />
				) : (
					<input type="checkbox" id={item.id} onChange={checkItem} />
				)}

				{item.name}
			</label>
			<li>Purchase again: {purchaseUrgencyMessage(item)}</li>
			<br></br>
		</li>
	);
}
