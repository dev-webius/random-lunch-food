import React from 'react';

import TimingUtil from './../utils/TimingUtil';

import './../styles/slot.scss';
import List from './List';

function getRandomID() {
	const id = 'slot-' + parseInt(Math.random() * 100000).toString();

	if (document.querySelector('#' + id)) {
		return getRandomID();
	}

	return id;
}
function getSafetyNumber(index, length) {
	if (index < 0) {
		return index + length;
	} else if (index >= length) {
		return 0;
	}
	return index;
}

class Slot extends React.Component {
	static STATE_READY = 0;
	static STATE_RUNNING = 1;
	static STATE_DONE = 2;

	constructor(props) {
		super(props);

		this.state = {
			id: getRandomID(),
			state: Slot.STATE_READY,
			active: null,
		};

		this.motion = this.motion.bind(this);
	}

	componentWillUnmount() {
		if (this.frameId !== void 0) {
			cancelAnimationFrame(this.frameId);
		}
		if (this.delayId !== void 0) {
			clearTimeout(this.delayId);
		}
		delete this.frameId;
		delete this.delayed;
		delete this.delayTime;
		delete this.delayingTime;
		delete this.delayId;
	}

	motion() {
		if (this.state.state === Slot.STATE_RUNNING) {
			return;
		}

		const list = document.querySelector('#' + this.state.id);
		if (!list) {
			return;
		}
		list.items = Array.prototype.slice.call(list.querySelectorAll('li'));
		list.items.forEach(item => {
			item.style.transform = '';
			item.style.zIndex = '';
		});

		this.setState({
			state: Slot.STATE_RUNNING,
			active: null,
		});

		const dataList = this.props.dataList;
		
		let active = 0;
		
		const tick = (function(time) {
			const progress = Math.max(0, Math.min(1, (time - beginTime) / randomTime));

			if (this.delayed) {
				if (time - this.delayTime >= this.delayingTime) {
					this.delayed = false;
				}
				
				this.frameId = requestAnimationFrame(tick);
			} else {
				const activeItem = list.items[active];
				const nextItem = list.items[getSafetyNumber(active + 1, dataList.length)];
				const prevItem = list.items[getSafetyNumber(active - 1, dataList.length)];
				const oldItem = list.items[getSafetyNumber(active - 2, dataList.length)];

				oldItem.style.transform = 'rotateX(180deg) translateZ(60px)';
				oldItem.style.zIndex = '';

				prevItem.style.transform = 'rotateX(60deg) translateZ(60px)';
				prevItem.style.zIndex = '1';

				nextItem.style.transform = 'rotateX(-60deg) translateZ(60px)';
				nextItem.style.zIndex = '1';

				activeItem.style.transform = 'rotateX(0deg) translateZ(60px)';
				activeItem.style.zIndex = '2';

				this.delayed = true;
				this.delayTime = performance.now();
				this.delayingTime = randomTime / 100 * TimingUtil.easeOutCubic(progress) * 2;
				
				if (progress < 1) {
					this.frameId = requestAnimationFrame(tick);

					active++;
					if (active > dataList.length - 1) {
						active = 0;
					}
				} else {
					this.setState({
						state: Slot.STATE_DONE,
						active: active,
					});
					this.delayId = setTimeout(() => {
						this.props.callback(this.props.dataList[active]);
					}, this.props.delay || 0);
				}
			}
		}).bind(this);

		const beginTime = performance.now();
		const randomTime = Math.random() * 2000 + 2000;

		this.frameId = requestAnimationFrame(tick);
		this.delayed = false;
		this.delayTime = null;
		this.delayingTime = null;
	}

	render() {
		return <>
			<div className="slot" id={this.state.id}>
				<List dataList={this.props.dataList} />
			</div>
		</>;
	}
}

export default Slot;