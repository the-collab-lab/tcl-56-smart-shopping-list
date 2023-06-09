import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1 className="lg:text-6xl text-4xl font-lato">
						Smart shopping list
					</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<NavLink to="/" className="Nav-link font-bold font-lato">
						Home
					</NavLink>
					<NavLink to="/list" className="Nav-link font-bold font-lato">
						List
					</NavLink>
					<NavLink to="/add-item" className="Nav-link font-bold font-lato">
						Add Item
					</NavLink>
				</nav>
			</div>
		</>
	);
}
