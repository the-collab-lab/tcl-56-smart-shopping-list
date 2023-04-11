import './Home.css';
import { useNavigate } from 'react-router-dom';

export function Home({ handleClick, token }) {
	const navigate = useNavigate();

	if (token) {
		navigate('/list');
	}

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
