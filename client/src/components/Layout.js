import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";

function Layout() {
	return (
		<>
			<Header />
			<main className="wrapper">
				<Outlet />
			</main>
		</>
	);
}

export default Layout;
