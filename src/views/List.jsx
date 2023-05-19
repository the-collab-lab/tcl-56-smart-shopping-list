import { ListItem } from '../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import Chippy3 from '/img/Chippy3.gif';
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
			{/* <p>Welcome to your shopping list!</p> */}
			<div id="chippyBox" className="grid grid-cols-3">
				<div className="chippy-suggestion chippy-suggestion-bottom-right col-span-2">
					{data.length < 2
						? 'Uh oh! Your shopping list is empty! Try using the "Add Item" button to begin your list!'
						: 'Yummy! That list is looking good! Did you know that you can use the filter to search within your list?'}{' '}
				</div>
				<img
					id="chippy"
					src={Chippy3}
					alt='Helpful potato chip gif named Chippy, à la "Clippy", who suggests that user adds an item to their shopping list '
				></img>
			</div>
			<div id="searchList" className="m-2 mt-4">
				<p>
					{data.length < 2
						? 'Your list is empty.  Add an item to get started.'
						: null}
				</p>
				<button
					className="btn"
					onClick={() => {
						navigate('/add-item');
					}}
				>
					Add Item
				</button>
				<form>
					<label htmlFor="searchbar">
						<h3 className="h3">Search List</h3>
						<input
							type="text"
							id="searchbar"
							className="inputField"
							onChange={handleSearch}
							value={query}
						></input>
					</label>
					<button className="btn" type="button" onClick={clearFilter}>
						Clear
					</button>
				</form>
			</div>
			<div id="itemList">
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
			</div>
			<div id="legend"></div>
		</>
	);
}
