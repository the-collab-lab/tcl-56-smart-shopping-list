import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function Home({ makeNewList, handleError }) {
	const handleClick = () => {
		const newToken = generateToken();
		makeNewList(newToken);
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{handleError ? <span>{handleError}</span> : null}
			<button onClick={handleClick}>Create a new list!</button>
			<form>
				<label htmlFor="input-field"> sharedToken</label>
				<input type="text" id="input-field" name="user-input" />
				{/* Will check for listtoken inside of db and Local Storage, will use handleClick function */}
				<button>Join Existing List</button>
			</form>
		</div>
	);
}
