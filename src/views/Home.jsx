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
		</div>
	);
}
