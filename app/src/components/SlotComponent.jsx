import React from 'react';

import TimingUtil from './../utils/TimingUtil';

import './../styles/slot.scss';

class SlotComponent extends React.Component {
	constructor(props) {
		super(props);

		this.motion = this.motion.bind(this);
		this.tick = this.tick.bind(this);
	}

	motion() {
		const uList = document.querySelector('#slot');
		const uListItems = uList.querySelectorAll('li');

		uListItems.forEach((item, index) => {
			item.textContent = index + 1;
			item.index = index;
		});

		uList.time = performance.now();
		uList.frameId = requestAnimationFrame(this.tick);
		uList.randomTime = Math.random() * 2000 + 2000;

		uList.delayed = false;
	}

	tick(time) {
		const uList = document.querySelector('#slot');
		const uListItems = uList.querySelectorAll('li');
		
		const progress = Math.max(0, Math.min(1, (time - uList.time) / uList.randomTime));
	
		const degree = 360 / uListItems.length;
		const radiusBase = uList.clientHeight * 2;
	
		if (uList.delayed) {
			if (time - uList.delayTime >= uList.delayingTime) {
				uList.delayed = false;
			}
		} else {
			uListItems.forEach((item) => {
				item.style.transform = 'rotateX(' + (item.index * degree) + 'deg)'
										+ ' translateZ(' + (radiusBase) + 'px)';
				item.style.zIndex = Math.abs(uListItems.length - item.index - (uListItems.length / 2));
	
				if (item.index === 0) {
					uList.current = item;
				}
		
				item.index++;
		
				if (item.index >= uListItems.length) {
					item.index = 0;
				}
			});
			
			uList.delayed = true;
			uList.delayTime = performance.now();
			uList.delayingTime = uList.randomTime / 100 * TimingUtil.easeOutCubic(progress) * 2;
		}
	
		if (progress < 1) {
			uList.frameId = requestAnimationFrame(this.tick);
		} else {
			const result = document.querySelector('#result');
	
			result.textContent = 'Result: ' + uList.current.textContent;
		}
	}

	render() {
		return <>
			<div id="slot">
				<ul className="slot-wrapper">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
			<button onClick={this.motion}>Click</button>
			<p id="result"></p>
		</>;
	}
}

export default SlotComponent;