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
			<div id="chippyBox" className="grid grid-cols-3 pt-5">
				<div className="chippy-suggestion chippy-suggestion-bottom-right col-span-2">
					{data.length < 1
						? `Uh oh! ${listName} list is empty! Try using the "Add Item" button to begin your list!`
						: `Yummy! That list is looking good! Did you know that you can use the filter to search within ${listName}?`}
				</div>
				<img
					id="chippy"
					src={Chippy3}
					alt='Helpful potato chip gif named Chippy, à la "Clippy", who suggests that user adds an item to their shopping list '
				></img>
			</div>
			<div id="listMods" className="m-2 pt-2">
				<span className="text-2xl">Want to check out a different list? </span>
				<button className="btn mr-12" onClick={removeListFromStorage}>
					Click here
				</button>
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
						<h3 className="h3 font-lato">Search List</h3>
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
			<div id="itemsGroup">
				<ul className="grid grid-cols-10">
					<li className="col-span-1"></li>
					<li className="col-span-7 h3 font-lato">Item</li>
					<li className="col-span-1"></li>
					<li className="col-span-1"></li>
				</ul>
				<ul id="itemList">
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
			<div id="legend">
				<h3 className="h3 font-lato pt-2 pb-3">Purchase Again?</h3>
				<div className="grid grid-rows-2 gap-5">
					<ul className="grid grid-cols-5">
						<li className="col-span-2">
							<span className="legendIcon inline-block">S</span>
							<span className="inline-block">Soon!</span>
						</li>
						<li className="col-span-2">
							<span className="legendIcon inline-block">KS</span>
							<span className="inline-block">Kinda Soon!</span>
						</li>
						<li className="col-span-1">
							<span className="legendIcon inline-block">NS</span>
							<span className="inline-block">Not Soon!</span>
						</li>
					</ul>
					<ul className="grid grid-cols-5">
						<li className="col-span-2">
							<span className="legendIcon inline-block">I</span>
							<span className="inline-block">Inactive!</span>
						</li>
						<li className="col-span-3">
							<span className="legendIcon inline-block">NP</span>
							<span className="inline-block">Not Yet Purchased!</span>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}
