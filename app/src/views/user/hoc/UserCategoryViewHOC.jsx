import React from 'react';

import { Link } from 'react-router-dom';

import CategoryList from '../../../components/CategoryList';

function UserCategoryViewHOC(type) {
	let title = "";
	if (type === 1) {
		title = "배달 뭐 먹지?";
	} else if (type === 2) {
		title = "나가서 뭐 먹지?";
	}

	return class UserCategoryView extends React.Component {
		constructor(props) {
			super(props);
	
			this.state = {
				categories: []
			};
	
			this.changeCategorySelected = this.changeCategorySelected.bind(this);
			this.getCategorySelected = this.getCategorySelected.bind(this);
		}

		componentDidMount() {
			fetch("/api/categoryList", {
				method: "GET"
			})
				.then(response => response.json())
				.then(data => {
					const categories = data.map(category => {
						return {
							id: category.id,
							class: category.className,
							selected: true,
							displayName: category.name
						};
					});
					this.setState({categories: categories});
				});
		}
	
		changeCategorySelected(index) {
			const categories = this.state.categories.slice();
			categories[index].selected = !categories[index].selected;
			
			this.setState({
				categories: categories
			});
		}
	
		getCategorySelected() {
			return this.state.categories.filter(item => !item.selected).map(item => item.id);
		}
	
		render() {
			return <>
				<div id="category">
					<div className="title">
						<h1>{title}</h1>
					</div>
					<div className="category">
						<CategoryList categories={this.state.categories} changeCategorySelected={this.changeCategorySelected} />
					</div>
					<div className="button-group">
						<Link className="btn btn-select" to="/select" state={{type: type, title: title, categories: this.getCategorySelected()}}>선택완료</Link>
						<Link className="btn btn-back" to="../">돌아가기</Link>
					</div>
				</div>
			</>;
		}
	}
}

UserCategoryViewHOC.CATEGORY = {
	DELIVERY: 1,
	WALK: 2,
};

export default UserCategoryViewHOC;