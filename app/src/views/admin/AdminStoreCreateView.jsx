import StoreForm from "../../components/StoreForm";

export default function AdminStoreCreateView() {
	return <>
		<div id="createStore">
			<div className="title">
				<h1>식당 등록</h1>
			</div>
			<StoreForm />
		</div>
	</>;
}