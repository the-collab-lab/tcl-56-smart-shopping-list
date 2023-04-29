import { ListItem } from '../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Chippy2 from '/img/Chippy2.gif';
import './List.css';

export function List({ data, listId }) {
	// creates a state variable to track searchbar input
	const [query, setQuery] = useState('');

	// sets the state to the searchbar input as the user types
	const handleSearch = (e) => {
		setQuery(e.target.value);
	};

	// clears the searchbar and resets the filtered list to the whole list
	const clearFilter = (e) => {
		setQuery('');
	};

	const navigate = useNavigate();

	return (
		<>
			<p>Welcome to your shopping list!</p>
			<p>
				{data.length < 2
					? 'Your list is empty.  Add an item to get started.'
					: null}
			</p>
			<button
				onClick={() => {
					navigate('/add-item');
				}}
			>
				Add Item
			</button>
			<form>
				<label htmlFor="searchbar">
					Filter Items
					<input
						type="text"
						id="searchbar"
						onChange={handleSearch}
						value={query}
					></input>
				</label>
				<button type="button" onClick={clearFilter}>
					Clear
				</button>
			</form>
			<ul>
				{/* filters the list to match the user's query as user types, then maps over the items that match the filter to display them */}
				{data
					.filter((item) =>
						item.name?.toLowerCase().includes(query.toLowerCase()),
					)
					.map((item) => {
						return <ListItem key={item.id} item={item} listId={listId} />;
					})}
			</ul>
			<div className="chippy-suggestion chippy-suggestion-bottom-right">
				{data.length < 2
					? 'Uh oh! Your shopping list is empty! Try using the "Add Item" button to begin your list!'
					: 'Yummy! That list is looking good! Did you know that you can use the filter to search within your list?'}{' '}
			</div>
			<img
				id="chippy"
				src={Chippy2}
				alt='Helpful potato chip gif named Chippy, à la "Clippy", who suggests that user adds an item to their shopping list '
			></img>
		</>
	);
}
