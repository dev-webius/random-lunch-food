import React from "react";

import TimingUtil from '../utils/TimingUtil';

import '../styles/slide.scss';

export default class Slide extends React.Component {
	constructor(props) {
		super(props);

		this.slideRef = React.createRef();
		
		this.state = {
			lastIndex: 0,
			index: 0,
			running: false,
			time: null,
			animationId: null,
		};
		this.running = false;

		this.slide = this.slide.bind(this);
		this.slideAnimation = this.slideAnimation.bind(this);
	}

	slide(index) {
		if (index < 0 || index >= this.props.dataList.length || this.state.running) {
			return;
		}

		this.setState({
			index: index,
			lastIndex: this.state.index,
			running: true,
			time: performance.now(),
			animationId: requestAnimationFrame(this.slideAnimation)
		});
	}

	slideAnimation(time) {
		const progress = (time - this.state.time) / this.props.duration;
		const valueOf = TimingUtil.easeOutCubic(progress);

		if (this.slideRef.current !== null) {
			const width = this.slideRef.current.clientWidth;
			const movement = (this.state.index - this.state.lastIndex) * width * valueOf;

			this.slideRef.current.style.transform = 'matrix(1, 0, 0, 1, ' + (-width * this.state.lastIndex - movement) + ', 0)';
		}

		if (progress > 1) {
			this.setState({
				running: false,
				time: null,
				animationId: null
			});
		} else {
			this.setState({
				animationId: requestAnimationFrame(this.slideAnimation)
			});
		}
	}

	render() {
		return <>
			<div className="slide-wrapper">
				<div className="slide">
					<ul ref={this.slideRef} style={{'transform': 'matrix(1, 0, 0, 1, 0, 0)'}}>
						{
							this.props.dataList.map((item, index) => {
								return <li key={index}>{item}</li>
							})
						}
					</ul>
				</div>
				{this.props.indicator && <>
					<div className="indicator">
						{
							this.props.indicator.map((item, index) => {
								return <button type="button" key={index} onClick={() => this.slide(index)}>{item}</button>
							})
						}
					</div>
				</>}
			</div>
		</>;
	}
}