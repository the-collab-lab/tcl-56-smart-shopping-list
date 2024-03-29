import { useState } from 'react';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';
import './Home.css';
import { Chippy } from './Chippy';

export function Home({ joinList, handleError, joinListErrorMsg }) {
	const [inputValue, setInputValue] = useState('');
	const [listName, setListName] = useState('');

	const handleClick = (event) => {
		event.preventDefault();
		// Note that creating lists is disabled for this project
		// const newToken = listName.trim().toLowerCase();
		// makeNewList(newToken);
		console.log('Creating new list is disabled for this project');
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
			<Chippy
				message={
					joinListErrorMsg ? (
						<span>{joinListErrorMsg}</span>
					) : (
						'Create your own list or join an existing one!'
					)
				}
			/>
			<p className="h3 font-lato pt-10">
				To create a new shopping list, give your list a name.
			</p>
			{handleError ? <span>{handleError}</span> : null}
			<form onSubmit={handleClick}>
				<label className="text-2xl font-medium" htmlFor="listName">
					List name{' '}
				</label>
				<input
					type="text"
					name="listName"
					id="listName"
					className="inputField"
					required
					value={listName}
					onChange={(e) => setListName(e.target.value)}
					pattern="[a-zA-Z0-9\s]+"
				/>
				<button className="btn mt-4 mb-4" type="submit">
					Create a new list!
				</button>
			</form>
			<div className="p-6 text-4xl text-center">-OR-</div>
			<div className="JoinListForm">
				<p className="h3 font-lato">
					Join an existing shopping list by entering a list name.
				</p>
				<form onSubmit={handleJoinList}>
					<label className="text-2xl font-medium" htmlFor="input">
						Share list name:
					</label>
					<input
						name="input"
						id="input"
						className="inputField"
						type="text"
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						pattern="[a-zA-Z0-9\s]+"
						required
					/>
					<button className="btn" type="submit">
						Join an existing list
					</button>
				</form>
			</div>
			<ArchivalNoticeModal />
		</div>
	);
}
