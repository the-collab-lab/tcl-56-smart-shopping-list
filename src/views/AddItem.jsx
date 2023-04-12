import { useState } from 'react';
import { addItem } from '../api/firebase';

export function AddItem({ listId }) {
	const [radioValue, setRadioValue] = useState('');
	const onOptionChange = (e) => {
		setRadioValue(e.target.value);
	};
	const onFormSubmit = (e) => {
		e.preventDefault();
		// console.log("state:", radioValue)
		const itemName = e.target[0].value;
		const daysUntilNextPurchase = parseInt(radioValue);

		const itemData = {
			itemName: itemName,
			daysUntilNextPurchase: daysUntilNextPurchase,
		};

		addItem(listId, itemData);
	};
	return (
		<>
			<form onSubmit={onFormSubmit}>
				<div>
					<label htmlFor="item">Item name:</label>
				</div>
				<input type="text" name="item" id="item" />
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
									onChange={onOptionChange}
									checked={radioValue === '7'}
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
									onChange={onOptionChange}
									checked={radioValue === '14'}
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
									onChange={onOptionChange}
									checked={radioValue === '30'}
								/>
								Not Soon
							</label>
						</div>
					</fieldset>
				</div>
				<button type="submit">Add Item</button>
			</form>
		</>
	);
}
