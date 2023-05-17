import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { comparePurchaseUrgency } from '../utils/items';
import Chippy3 from '/img/Chippy3.gif';
import './List.css';

export function List({ data, listId }) {
	// creates a state variable to track searchbar input
	const [query, setQuery] = useState('');
	const [listName, setListName] = useState('');

	// sets the state to the searchbar input as the user types
	const handleSearch = (e) => {
		setQuery(e.target.value);
	};
	// clears the searchbar and resets the filtered list to the whole list
	const clearFilter = (e) => {
		setQuery('');
	};
	const navigate = useNavigate();

	const removeListFromStorage = () => {
		//remove list from local storage
		localStorage.removeItem('tcl-shopping-list-token');
		// refresh page to force redirect to home page
		window.location.reload();
	};

	useEffect(() => {
		if (!listId) {
			navigate('/');
		}
		const listName = localStorage.getItem('tcl-shopping-list-token');
		setListName(listName);
	}, [listName, listId, navigate]);

	return (
		<>
			<p>
				Welcome to your <strong>{listName}</strong> shopping list!
			</p>
			<p>
				{data.length < 2 ? (
					'Your list is empty.  Add an item to get started.'
				) : (
					<>
						<span>Want to check out a different list? </span>
						<button onClick={removeListFromStorage}>Click here</button>
					</>
				)}
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
				{comparePurchaseUrgency(data)
					.filter((item) =>
						item.name?.toLowerCase().includes(query.toLowerCase()),
					)
					.map((item) => {
						return <ListItem key={item.id} item={item} listId={listId} />;
					})}
			</ul>
			<div className="chippy-suggestion chippy-suggestion-bottom-right">
				{data.length < 2
					? `Uh oh! ${listName} list is empty! Try using the "Add Item" button to begin your list!`
					: `Yummy! Your shopping list is looking good! Did you know that you can use the filter to search within ${listName}?`}
			</div>
			<img
				id="chippy"
				src={Chippy3}
				alt='Helpful potato chip gif named Chippy, à la "Clippy", who suggests that user adds an item to their shopping list '
			></img>
		</>
	);
}
