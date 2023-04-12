import './Home.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function Home({ makeNewList }) {
	const navigate = useNavigate();

	const handleClick = () => {
		const newToken = generateToken();
		makeNewList(newToken);
		navigate('/list');
	};

	// useEffect(() => {
	// 	if (token) {
	// 		navigate('/list');
	// 	}
	// },[navigate, token]);

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
