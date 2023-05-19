import { useState } from 'react';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import './Home.css';

export function Home({ makeNewList, joinList, handleError, joinListErrorMsg }) {
	const [inputValue, setInputValue] = useState('');

	const handleClick = () => {
		const newToken = generateToken();
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
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{handleError ? <span>{handleError}</span> : null}
			<button className="btn" onClick={handleClick}>
				Create a new list!
			</button>

			<div className="JoinListForm">
				<p>Join an existing shopping list by entering a three word token.</p>
				{joinListErrorMsg ? <span>{joinListErrorMsg}</span> : null}
				<form onSubmit={handleJoinList}>
					<label className="h3" htmlFor="input">
						Share token:
					</label>
					<input
						name="input"
						id="input"
						className="inputField"
						type="text"
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
						pattern="[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+"
						onInvalid={(e) =>
							e.target.setCustomValidity(
								'Please enter 3 words with single space only.',
							)
						}
						onInput={(e) => e.target.setCustomValidity('')}
						required
					/>
					<button className="btn" type="submit">
						Join an existing list
					</button>
				</form>
			</div>
		</div>
	);
}
