import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';

export function ListItem({ item, listId }) {
	const [checked, setChecked] = useState(false);
	const { name, id, dateLastPurchased } = item;

	const checkItem = (e) => {
		updateItem(listId, id);
	};

	useEffect(() => {
		if (dateLastPurchased) {
			const lastPurchasedDate = dateLastPurchased.toDate();
			const hoursPlus24 = lastPurchasedDate.getHours() + 24;

			const newDate = new Date(lastPurchasedDate.setHours(hoursPlus24));

			if (newDate > new Date()) {
				setChecked(true);
			}
		}
	}, [checked, dateLastPurchased]);

	return (
		<li className="ListItem">
			<label htmlFor={id}>
				{checked ? (
					<input type="checkbox" id={id} onChange={checkItem} checked />
				) : (
					<input type="checkbox" id={id} onChange={checkItem} />
				)}

				{name}
			</label>
		</li>
	);
}
