import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StoreForm from "../../components/StoreForm";

export default function AdminStoreUpdateView() {
	const navigate = useNavigate();
	const params = useParams();

	const [ store, setStore ] = useState(null);

	useEffect(() => {
		if (store === null) {
			const formData = new FormData();
			formData.append("id", params.storeId);
			formData.append("manage", true);
			fetch("/api/store", {
				method: "POST",
				body: formData,
			})
				.then(response => response.json())
				.then(response => {
					if (response.success) {
						setStore(response.data);
					} else {
						// navigate("../store");
					}
				});
		}
	});

	return <>
		<div id="createStore">
			<div className="title">
				<h1>식당 수정</h1>
			</div>
			<StoreForm store={store} />
		</div>
	</>;
}