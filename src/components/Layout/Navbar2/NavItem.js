import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({
	title,
	href,
	icon,
	active,
	notification,
	onClick,
	target,
}) => {
	const ContentItem = () => (
		<>
			{icon}
			<span className="mx-4 text-lg font-normal">{title}</span>
			<span className="flex-grow text-right">
				{notification > 0 && (
					<button
						type="button"
						className="w-6 h-6 text-xs  rounded-full text-white bg-red-500"
					>
						<span className="p-1">{notification}</span>
					</button>
				)}
			</span>
		</>
	);
	const activeItem =
		"hover:text-gray-800 hover:bg-gray-200 flex items-center p-2 my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-800 dark:text-gray-100 rounded-md bg-gray-200 dark:bg-gray-600";
	const notActiveItem =
		"hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-md ";

	return target ? (
		<a
			className={active ? activeItem : notActiveItem}
			href={href}
			target={target}
		>
			<ContentItem />
		</a>
	) : (
		<Link
			className={active ? activeItem : notActiveItem}
			to={href}
			onClick={onClick}
		>
			<ContentItem />
		</Link>
	);
};

export default NavItem;
