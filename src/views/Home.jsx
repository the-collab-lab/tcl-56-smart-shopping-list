import { useState } from 'react';
// import { generateToken } from '@the-collab-lab/shopping-list-utils';
import './Home.css';

export function Home({ makeNewList, joinList, handleError, joinListErrorMsg }) {
	const [inputValue, setInputValue] = useState('');
	const [listName, setListName] = useState('');

	const handleClick = (event) => {
		event.preventDefault();
		const newToken = listName.trim().toLowerCase();
		makeNewList(newToken);
	};
	/**
	 * Function handles taking the form input and passing it through joinList callback function after it is validated and sanitized
	 **/
	const handleJoinList = (event) => {
		event.preventDefault();
		const userInput = inputValue.trim().toLowerCase();
		joinList(userInput);
	};

	return (
		<div className="Home">
			<p>To create a new shopping list, give your list a name.</p>
			{handleError ? <span>{handleError}</span> : null}
			<form onSubmit={handleClick}>
				<label htmlFor="listName">List name </label>
				<input
					type="text"
					name="listName"
					id="listName"
					required
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					pattern="[a-zA-Z0-9\s]+"
				/>
				<button type="submit">Create a new list!</button>
			</form>

			<div className="JoinListForm">
				<p>Join an existing shopping list by entering a list name.</p>
				{joinListErrorMsg ? <span>{joinListErrorMsg}</span> : null}
				<form onSubmit={handleJoinList}>
					<label htmlFor="input">Shared list name </label>
					<input
						name="input"
						id="input"
						type="text"
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						pattern="[a-zA-Z0-9\s]+"
						required
						// onInvalid={(e) =>
						// 	e.target.setCustomValidity(
						// 		'Please enter a valid list name i.e no numbers.',
						// 	)
						// }
						// onInput={(e) => e.target.setCustomValidity('')}
					/>
					<button type="submit">Join an existing list</button>
				</form>
			</div>
		</div>
	);
}
