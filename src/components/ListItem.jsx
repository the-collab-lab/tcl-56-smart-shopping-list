import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';

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
		</li>
	);
}
