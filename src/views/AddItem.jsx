import { useEffect, useState } from 'react';
import { addItem } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import { Chippy } from './Chippy';

export function AddItem({ data, listId }) {
	const navigate = useNavigate();
	useEffect(() => {
		if (!listId) {
			navigate('/');
		}
	}, [listId, navigate]);

	const [itemData, setItemData] = useState({
		itemName: '',
		daysUntilNextPurchase: 7,
	});
	const [submitMessage, setSubmitMessage] = useState('');

	const onChange = (e) => {
		if (submitMessage) {
			setSubmitMessage('');
		}

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
			const cleanItemName = itemData.itemName
				.replace(/[\W_]/g, '')
				.toLowerCase();
			const duplicateItem = data.find((item) =>
				item.name?.toLowerCase().includes(cleanItemName),
			);
			if (duplicateItem) {
				setSubmitMessage('Item already exist on your list.');
			} else {
				addItem(listId, itemData);
				setSubmitMessage('Item successfully added to your list!');
			}
		} catch (error) {
			setSubmitMessage('An error occured.');
		}
	};

	return (
		<>
			<Chippy
				message={
					submitMessage === ''
						? 'Please add an item to your list!'
						: submitMessage
				}
			/>
			<form onSubmit={onFormSubmit}>
				<div className="pt-6">
					<label className="h3 font-lato" htmlFor="item">
						Item Name:
					</label>
				</div>
				<input
					type="text"
					name="item"
					id="item"
					className="inputField"
					required
					value={itemData.itemName}
					onChange={onChange}
				/>
				<div>
					<fieldset>
						<legend className="h3 font-lato pt-4 pb-4">
							How soon will you buy this again?
						</legend>
						<div className="pb-4">
							<label htmlFor="soon" className="text-2xl">
								<input
									type="radio"
									id="soon"
									className="mr-4"
									name="daysTillNextPurchase"
									value="7"
									onChange={onChange}
									checked={itemData.daysUntilNextPurchase === 7}
								/>
								Soon
							</label>
						</div>
						<div className="pb-4">
							<label htmlFor="kindaSoon" className="text-2xl">
								<input
									type="radio"
									id="kindaSoon"
									className="mr-4"
									name="daysTillNextPurchase"
									value="14"
									onChange={onChange}
									checked={itemData.daysUntilNextPurchase === 14}
								/>
								Kinda Soon
							</label>
						</div>
						<div className="pb-4">
							<label htmlFor="notSoon" className="text-2xl">
								<input
									type="radio"
									id="notSoon"
									className="mr-4"
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
				<button className="btn mt-4" type="submit">
					Add Item
				</button>
			</form>
		</>
	);
}
