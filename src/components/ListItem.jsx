import './ListItem.css';

export function ListItem({ name, key }) {
	return (
		<li class="ListItem">
			<label htmlFor={key}>
				<input type="checkbox" id={key} />
				{name}
			</label>
		</li>
	);
}
