import { Routes, Route } from 'react-router-dom';

import UserMainView from './UserMainView';
import UserCategoryViewHOC from './hoc/UserCategoryViewHOC';
import UserSelectView from './UserSelectView';
import UserResultView from './UserResultView';

import UserErrorView from './UserErrorView';

import './../../styles/user.scss';

const UserDeliveryView = UserCategoryViewHOC(UserCategoryViewHOC.CATEGORY.DELIVERY);
const UserWalkView = UserCategoryViewHOC(UserCategoryViewHOC.CATEGORY.WALK);

export default function UserView() {
	return <>
		<div className="user-view">
			<Routes>
				<Route index element={<UserMainView />} />
				<Route path="delivery" element={<UserDeliveryView />} />
				<Route path="walk" element={<UserWalkView />} />
				<Route path="select" element={<UserSelectView />} />
				<Route path="result" element={<UserResultView />} />
				<Route path="*" element={<UserErrorView code={404} />} />
			</Routes>
			{/*<div className="copyright">Created by Seung ♥ Hyeok</div> */}
		</div>
	</>;
}