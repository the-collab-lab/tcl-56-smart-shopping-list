import {
	collection,
	onSnapshot,
	addDoc,
	updateDoc,
	deleteDoc,
	increment,
	doc,
} from 'firebase/firestore';
import { db } from './config';
import {
	getFutureDate,
	transformToJSDate,
	getDaysBetweenDates,
	getNextPurchaseDate,
} from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';
/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	/**
	 * Firebase document snapshots contain a `.docs` property that is an array of
	 * document references. We use `.map()` to iterate over them.
	 * @see https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot
	 */
	return snapshot.docs.map((docRef) => {
		/**
		 * We call the `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;

		return data;
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	return await addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});
}
/**
 * Update an existing item in the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} item Information about the new item.
 **/
export async function updateItem(listId, item) {
	const {
		id,
		dateCreated,
		dateLastPurchased,
		dateNextPurchased,
		totalPurchases,
	} = item;

	const prevEstimate = getDaysBetweenDates(
		transformToJSDate(dateCreated),
		transformToJSDate(dateNextPurchased),
	);
	const daysSinceLastPurchase = getDaysBetweenDates(
		transformToJSDate(dateLastPurchased ? dateLastPurchased : dateCreated),
		new Date(),
	);

	const estimatedNextPurchase = calculateEstimate(
		prevEstimate,
		daysSinceLastPurchase,
		totalPurchases,
	);
	const itemRef = doc(db, listId, id);
	return await updateDoc(itemRef, {
		dateLastPurchased: new Date(),
		dateNextPurchased: getNextPurchaseDate(estimatedNextPurchase),
		totalPurchases: increment(1),
	});
}

export async function deleteItem(listId, item) {
	try {
		await deleteDoc(doc(db, listId, item.id));
		return { success: true };
	} catch (error) {
		console.log('Failed to delete item', error);
		return { success: false, error: error.message };
	}
}
