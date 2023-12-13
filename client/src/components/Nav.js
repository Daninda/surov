import React from "react";
import { Link } from "react-router-dom";

function Nav() {
	return (
		<div className="navbar">
			<nav className="navbar__links">
				<Link to="/clients">Клиенты</Link>
				<Link to="/providers">Поставщики</Link>
				<Link to="/models">Модели</Link>
				<Link to={"/report"}>Отчет</Link>
			</nav>
		</div>
	);
}

export default Nav;
