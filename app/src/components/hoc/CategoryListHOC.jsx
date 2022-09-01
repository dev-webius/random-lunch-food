import React from 'react';

import List from '../List';

import '../../styles/category.scss';

function CategoryListHOC() {
	return class CategoryList extends React.Component {
		render() {
			const { categories, changeCategorySelected, useCheckbox = true } = this.props;

			return <>
				<List dataList={categories.map((item, index) => (
					{
						id: item.id,
						key: item.id || item.displayName,
						value: <>
							<label className={item.class}>
								{ useCheckbox && <input type="checkbox" checked={item.selected} onChange={() => changeCategorySelected(index)} /> }
								<i></i>
								<span>{item.value || item.displayName}</span>
							</label>
						</>
					}
				))} />
			</>;
		}
	}
}

export default CategoryListHOC;