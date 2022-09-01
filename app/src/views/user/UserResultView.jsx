import { useEffect } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import Store from '../../components/Store';



export default function UserResultView() {
	const location = useLocation();
	const navigate = useNavigate();
	const data = location.state;
	useEffect(() => {
		if (!(data || data.store)) {
			navigate('/', { replace: true, state: {
				error: {
					code: 2,
					message: '식당 데이터를 불러올 수 없습니다.'
				}
			}});

			return;
		}
	}, [data, navigate]);

	return <>
		<div id="result">
		{ data &&
			<>
				<div className="title">
					<h1>추첨 결과!</h1>
				</div>
				<Store store={data.store} type={data.type} />
				<div className="button-group">
					<Link className="btn btn-back" to="/">메인으로 돌아가기</Link>
				</div>
			</>
		}
		</div>
	</>;
}