import './ListItem.css';
import { updateItem } from '../api/firebase';

export function ListItem({ name, itemId, listId }) {
	const checkItem = (e) => {
		console.log(e.target, listId, itemId);
		updateItem(listId, itemId);
	};

	return (
		<li className="ListItem">
			<label htmlFor={itemId}>
				<input type="checkbox" id={itemId} onChange={checkItem} />
				{name}
			</label>
		</li>
	);
}
