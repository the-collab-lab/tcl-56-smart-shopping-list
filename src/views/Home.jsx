import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function Home({ makeNewList }) {
	const handleClick = () => {
		const newToken = generateToken();
		makeNewList(newToken);
	};

	return (
		<div className="Home">
			<p>
				Hello from the home (<code>/</code>) page!
			</p>
			{/* here is a create a new list button with a handleClick action*/}
			<button onClick={handleClick}>Create a new list!</button>
		</div>
	);
}
