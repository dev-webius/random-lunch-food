import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import '../../styles/admin/store.scss';

export default function AdminStoreView() {
	const [ storeList, setStoreList ] = useState([]);
	const [ searchWord, setSearchWord ] = useState("");

	useEffect(() => {
		if (!storeList.length) {
		fetch("/api/storeList", {
			method: "POST"
		})
			.then(response => response.json())
			.then(data => setStoreList(data));
		}
	});

	function inputSearchWord(event) {
		setSearchWord(event.target.value);
	}

	return <>
		<div id="storeList">
			<div className="title">
				<h1>MANAGEMENT <br/>&lt;STORE&gt;</h1>
			</div>
			<div className="button-group no-margin">
				<Link className="btn btn-add" to="create">등록하기</Link>
			</div>
			<div className="store-wrapper">
				<input type="text" onInput={inputSearchWord} placeholder="검색어 입력" />
				<ul>
					{
						storeList
							.filter(store => searchWord === "" || store.name.match(searchWord) || store.categoryName.match(searchWord))
							.map(store => <li key={store.name}><Link to={store.id.toString()}>{store.categoryName} -&gt; {store.name}</Link></li>)
					}
				</ul>
			</div>
			<div className="button-group">
				<Link className="btn btn-back" to="../">뒤로가기</Link>
			</div>
		</div>
	</>;
}