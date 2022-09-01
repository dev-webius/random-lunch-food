import { Link } from "react-router-dom";

import randomLunchMan from './../../images/random-lunch-man.png';

export default function UserMainView() {
	return <>
		<div id="main">
			<div className="title">
				<figure>
					<picture>
						<img src={randomLunchMan} alt="random lunch man" />
					</picture>
				</figure>
				<h1>RANDOM LUNCH</h1>
			</div>
			<div className="button-group">
				<Link className="btn btn-delivery" to="delivery">시켜먹기</Link>
				<Link className="btn btn-walk" to="walk">나가서먹기</Link>
			</div>
		</div>
	</>;
}