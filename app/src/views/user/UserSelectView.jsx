import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import SlotHOC from '../../components/hoc/SlotHOC';

const slotRef = React.createRef();
function selectOnClick(event) {
	if (slotRef.current) {
		slotRef.current.motion();

		event.target.classList.add('state-running');
	}
}

function callback(navigate, type, store) {
	const formData = new FormData();
	formData.append("id", store.key);
	//formData.append("id", 217);

	fetch("/api/store", {
		method: "POST",
		body: formData,
	})
		.then(response => response.json())
		.then(data => {
			navigate("/result", { state: { type: type, store: data } });
		});
};

export default function UserSelectView() {
	const location = useLocation();
	const navigate = useNavigate();

	const [ stores, setStores ] = useState([]);

	const data = location.state;
	useEffect(() => {
		if (data === null) {
			navigate('/', { replace: true, state: {
				error: {
					code: 1,
					message: '카테고리 데이터를 불러올 수 없습니다.'
				}
			} });

			return;
		}

		const formData = new FormData();
		formData.append("type", data.type);
		formData.append("categories", data.categories.toString());

		fetch("/api/storeList", {
			method: "POST",
			body: formData
		})
			.then(response => response.json())
			.then(data => {
				setStores(data.map(store => ({
					key: store.id,
					value: store.name
				})));
			});
	}, [data, navigate]);

	const slotCallback = callback.bind(this, navigate, data.type);
	
	return <>
		<div id="select">
		{ data &&
			<>
				<div className="title">
					<h1>{data.title}</h1>
				</div>
				<SlotHOC ref={slotRef} dataList={stores} useRandom={true} delay={1000} callback={slotCallback} />
				<div className="button-group">
					<button className="btn btn-select" onClick={selectOnClick}>돌리기</button>
					<Link className="btn btn-back" to="../">돌아가기</Link>
				</div>
			</>
		}
		</div>
	</>;
}