module.exports = function asyncWait(onEmpty) {
	var counter = 0;
	setTimeout(callback(), 0);
	return callback;
 
	function callback(cb) {
		var called = false;
		++counter;
		
		return function() {
			if (called) return;
			called = true;
			--counter;
			if (typeof cb === "function") cb.apply(this, arguments);
			if (!counter && typeof onEmpty === "function") onEmpty();
		}
	};
};