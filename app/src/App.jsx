import { Routes, Route } from 'react-router-dom';

import UserView from './views/user/UserView';
import AdminView from './views/admin/AdminView';

import './styles/app.scss';

export default function App() {
	return <>
		<div className="app">
			<Routes>
				<Route path="/*" element={<UserView />} />
				<Route path="/manage/*" element={<AdminView />} />
			</Routes>
		</div>
	</>;
}