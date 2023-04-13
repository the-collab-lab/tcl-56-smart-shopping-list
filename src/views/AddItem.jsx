import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listId }) {
	const [itemData, setItemData] = useState({
		itemName: '',
		daysUntilNextPurchase: null,
	});
	const [submitMessage, setSubmitMessage] = useState('');

	const onChange = (e) => {
		if (e.target.name === 'daysTillNextPurchase') {
			setItemData((itemData) => ({
				...itemData,
				daysUntilNextPurchase: parseInt(e.target.value),
			}));
		} else {
			setItemData((itemData) => ({
				...itemData,
				itemName: e.target.value,
			}));
		}
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		try {
			addItem(listId, itemData);
			setSubmitMessage('Item successfully added to your list!');
		} catch (error) {
			setSubmitMessage('An error occured.');
		}
	};

	return (
		<>
			<form onSubmit={onFormSubmit}>
				<div>
					<label htmlFor="item">Item name:</label>
				</div>
				<input type="text" name="item" id="item" onChange={onChange} />
				<div>
					<fieldset>
						<legend>How soon will you buy this agin?</legend>
						<div>
							<label htmlFor="soon">
								<input
									type="radio"
									id="soon"
									name="daysTillNextPurchase"
									value="7"
									onChange={onChange}
									checked={itemData.daysUntilNextPurchase === 7}
								/>
								Soon
							</label>
						</div>
						<div>
							<label htmlFor="kindaSoon">
								<input
									type="radio"
									id="kindaSoon"
									name="daysTillNextPurchase"
									value="14"
									onChange={onChange}
									checked={itemData.daysUntilNextPurchase === 14}
								/>
								Kinda Soon
							</label>
						</div>
						<div>
							<label htmlFor="notSoon">
								<input
									type="radio"
									id="notSoon"
									name="daysTillNextPurchase"
									value="30"
									onChange={onChange}
									checked={itemData.daysUntilNextPurchase === 30}
								/>
								Not Soon
							</label>
						</div>
					</fieldset>
				</div>
				<button type="submit">Add Item</button>
			</form>
			<p>{submitMessage}</p>
		</>
	);
}
