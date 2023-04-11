import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from 'react-router-dom';
import { AddItem, Home, Layout, List } from './views';
import { generateToken } from '@the-collab-lab/shopping-list-utils';

import { getItemData, streamListItems } from './api';
import { useStateWithStorage } from './utils';

export function App() {
	const [data, setData] = useState([]);
	/**
	 * Here, we're using a custom hook to create `listToken` and a function
	 * that can be used to update `listToken` later.
	 *
	 * `listToken` is `my test list` by default so you can see the list
	 * of items that was prepopulated for this project.
	 * You'll later set it to `null` by default (since new users do not
	 * have tokens), and use `setListToken` when you allow a user
	 * to create and join a new list.
	 */
	const [listToken, setListToken] = useStateWithStorage(
		null,
		'tcl-shopping-list-token',
	);

	// function that handles the button click in Home to generate new token

	// check if user already has token in localStorage

	// the handleClick function will call generateToken from npm package

	// generate new token and save to localStorage using setListToken

	//redirect to List view

	const handleClick = () => {
		if (!listToken) {
			const newToken = generateToken();
			setListToken(newToken);
		}
	};

	// const navigate = useNavigate()

	// if (token) {
	// 	navigate("/list")
	// }

	useEffect(() => {
		if (!listToken) return;

		/**
		 * streamListItems` takes a `listToken` so it can commuinicate
		 * with our database, then calls a callback function with
		 * a `snapshot` from the database.
		 *
		 * Refer to `api/firebase.js`.
		 */
		return streamListItems(listToken, (snapshot) => {
			/**
			 * Here, we read the documents in the snapshot and do some work
			 * on them, so we can save them in our React state.
			 *
			 * Refer to `api/firebase.js`
			 */
			const nextData = getItemData(snapshot);

			/** Finally, we update our React state. */
			setData(nextData);
		});
	}, [listToken]);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* the home component gets handleClick function passed as prop*/}
					<Route
						index
						element={<Home handleClick={handleClick} token={listToken} />}
					/>
					<Route path="/list" element={<List data={data} />} />
					<Route path="/add-item" element={<AddItem />} />
				</Route>
			</Routes>
		</Router>
	);
}
