import React from 'react';
import Slot from '../Slot';

function SlotHOC() {
	class EnhancedSlot extends React.Component {
		render() {
			const { forwardedRef, dataList, useRandom, ...passProps } = this.props;
			
			if (useRandom) {
				dataList.sort(() => Math.round(Math.random()) ? 1 : -1);
			}

			return <Slot ref={forwardedRef} dataList={dataList} {...passProps} />;
		}
	}

	const SlotRef = React.forwardRef((props, ref) => {
		return <EnhancedSlot forwardedRef={ref} {...props} />;
	});
	SlotRef.displayName = "SlotRef<EnhancedSlot>";

	return SlotRef;
}

export default SlotHOC();