import React from 'react';
import Slide from './Slide';

export default class GallerySlide extends React.Component {
	render() {
		return <>
			<Slide dataList={this.props.dataList} indicator={this.props.dataList} duration={this.props.duration} />
		</>;
	}
}