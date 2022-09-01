import React from 'react';

class List extends React.Component {
	render() {
		return <>
			<ul>
			{
				this.props.dataList.map(item => (
					<li key={item.key}>{item.value}</li>
				))
			}
			</ul>
		</>;
	}
}

export default List;