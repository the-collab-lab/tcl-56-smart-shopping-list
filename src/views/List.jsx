import { ListItem } from '../components';
import { useState } from 'react';

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

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
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
						return (
							<ListItem
								key={item.id}
								name={item.name}
								itemId={item.id}
								listId={listId}
							/>
						);
					})}
			</ul>
		</>
	);
}
