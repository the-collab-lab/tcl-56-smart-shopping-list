import { ListItem } from '../components';

export function List({ data }) {
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			{/* add a form component with search bar */}
			{/* includes text field with semantic "label", working properly if focus changes on clicking*/}
			{/* filter should match any part of item name not just from start of string */}
			{/* should include clear field button on search bar */}
			<form>
				<label for="searchbar">
					Filter Items
					<input type="text" id="searchbar"></input>
				</label>
			</form>
			<ul>
				{data.map((item) => {
					return <ListItem key={item.id} name={item.name} />;
				})}
			</ul>
		</>
	);
}
