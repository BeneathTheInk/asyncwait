var asyncWait = require("../");
var expect = require("./utils/expect");

describe("wait", function() {
	it("defer a call to onEmpty by default", function(done) {
		var isAfter = false;

		asyncWait(function() {
			expect(isAfter).to.equal(true, "onEmpty function was called prematurely.");
			done();
		});

		isAfter = true;
	});

	it("immediately call functions passed to the callback method on run", function(done) {
		var isAfter = false;
		
		var proxy = asyncWait(done)(function() {
			expect(isAfter).to.equal(false, "Passed function was not called immediately.");
		});

		process.nextTick(function() {
			proxy();
			isAfter = true;
		});
	});

	it("pass same context and arguments through proxy callback", function(done) {
		var context = {}, arg1 = {}, arg2 = {};

		var proxy = asyncWait(done)(function(a, b) {
			expect(this).to.equal(context, "Context was not the same.");
			expect(a).to.equal(arg1, "Argument 1 was not the same.");
			expect(b).to.equal(arg2, "Argument 2 was not the same.");
		});

		process.nextTick(function() {
			proxy.call(context, arg1, arg2);
		});
	});

	it("wait for multiple async operations to finish", function(done) {
		var finished = [ false, false, false ];

		var callback = asyncWait(function() {
			expect(finished).to.deep.equal([ true, true, true ], "One or more callbacks wasn't fired.");
			done();
		});

		setTimeout(callback(function() { finished[0] = true; }), 10);
		setTimeout(callback(function() { finished[1] = true; }), 25);
		setTimeout(callback(function() { finished[2] = true; }), 100);
	});
});