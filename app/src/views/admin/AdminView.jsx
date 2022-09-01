import { Routes, Route } from 'react-router-dom';

import AdminMainView from './AdminMainView';
import AdminStoreView from './AdminStoreView';
import AdminStoreCreateView from './AdminStoreCreateView';
import AdminStoreUpdateView from './AdminStoreUpdateView';

import './../../styles/admin.scss';

export default function AdminView() {
	return <>
		<div className="admin-view">
			<Routes>
				<Route index element={<AdminMainView />} />
				<Route path="store" element={<AdminStoreView />} />
				<Route path="store/create" element={<AdminStoreCreateView />} />
				<Route path="store/:storeId" element={<AdminStoreUpdateView />} />
			</Routes>
		</div>
	</>;
}