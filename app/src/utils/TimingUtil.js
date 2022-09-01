class TimingUtil {
	static easeOutCubic(x) {
		return 1 - Math.pow(1 - x, 3);
	}
}

export default TimingUtil;