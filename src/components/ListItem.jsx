import { useState, useEffect } from 'react';
import './ListItem.css';
import { updateItem } from '../api/firebase';
import {
	getItemDaysUntilNextPurchase,
	getItemDaysSinceLastPurchase,
} from '../utils';
import { deleteItem } from '../api/firebase';

export function ListItem({ item, listId }) {
	const [checked, setChecked] = useState(false);
	const [deleteError, setDeleteError] = useState('');

	const checkItem = (e) => {
		updateItem(listId, item);
	};
	async function handleDelete() {
		if (window.confirm('Are you sure you want to delete this item?')) {
			const response = await deleteItem(listId, item);
			console.log(response);
			response.success
				? console.log('success')
				: setDeleteError('Failed to delete item, please try again later');
		}
	}

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
			// return 'Soon!';
			return 'S';
		} else if (
			getItemDaysUntilNextPurchase(item) > 7 &&
			getItemDaysUntilNextPurchase(item) < 30
		) {
			// return "You've got a bit of time";
			return 'KS';
		} else if (
			getItemDaysUntilNextPurchase(item) >= 30 &&
			getItemDaysSinceLastPurchase(item) < 60
		) {
			// return 'Not for a while';
			return 'NS';
		} else if (getItemDaysSinceLastPurchase(item) > 60) {
			// return "You don't seem to be buying this anymore";
			return 'I';
		} else {
			// return "You haven't purchased this item yet!";
			return 'NP';
		}
	};

	return (
		<li className="ListItem">
			<div className="grid grid-cols-10 mb-3 items-center">
				<li className="col-span-1 border-2 text-center mr-2 border-gray-400 rounded-md h-11 w-12">
					{purchaseUrgencyMessage(item)}
				</li>
				<label className="col-span-7" htmlFor={item.id}>
					{item.name} {deleteError}
				</label>
				{checked ? (
					<input
						className="col-span-1 w-8 h-8"
						type="checkbox"
						id={item.id}
						onChange={checkItem}
						checked
					/>
				) : (
					<input
						className="col-span-1 w-8 h-8"
						type="checkbox"
						id={item.id}
						onChange={checkItem}
					/>
				)}
				<button className="btn-delete col-span-1" onClick={handleDelete}>
					X
				</button>
			</div>
		</li>
	);
}
