import { Link } from "react-router-dom";

export default function AdminMainView() {
	return <>
		<div id="main">
			<div className="title">
				<h1>MANAGEMENT</h1>
			</div>
			<div className="button-group">
				<Link className="btn" to="store">식당 관리</Link>
			</div>
		</div>
	</>;
}