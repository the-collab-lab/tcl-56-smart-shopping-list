import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './api/config';
import { AddItem, Home, Layout, List } from './views';
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
	/**
	 * Here, we're setting the state of an error message that will be displayed to the user incase the Promise is not fulfilled when generating a new list.
	 **/
	const [timeOutErrorMsg, setTimeOutErrorMsg] = useState('');
	/**
	 * Callback function gets passed as a prop through Home component to retrieve generated token.
	 * The addDoc function call is wrapped in a Promise.race() method with a Promise that rejects after a certain timeout period.
	 * If the Promise times out, the Promise is rejected with an error message to the user, else the Promise is resolved and
	 * the token is added to the database and set to localStorage through setListToken.
	 **/
	const setList = async (token) => {
		try {
			const result = await Promise.race([
				addDoc(collection(db, `${token}`), {}),
				new Promise((resolve, reject) => {
					setTimeout(() => {
						reject(new Error('Promise timed out: Database not responding'));
					}, 5000);
				}),
			]);
			setListToken(token);
			console.log('New list created with ID: ', result.id);
		} catch (e) {
			console.error('Error adding new list token: ', e);
			setTimeOutErrorMsg('New List Error. Please refresh or try again later.');
		}
	};

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
					<Route
						index
						element={
							listToken ? (
								<List data={data} />
							) : (
								<Home
									makeNewList={(token) => setList(token)}
									handleError={timeOutErrorMsg}
								/>
							)
						}
					/>
					<Route path="/list" element={<List data={data} />} />
					<Route path="/add-item" element={<AddItem />} />
				</Route>
			</Routes>
		</Router>
	);
}
