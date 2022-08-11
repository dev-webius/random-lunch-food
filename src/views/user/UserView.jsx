import { Outlet } from 'react-router-dom';

export default function UserView() {
	return <>
		<h1>User View</h1>
		<Outlet />
	</>;
}