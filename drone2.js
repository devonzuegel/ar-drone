/* Drone waterfall
 * -------
 * Runs all possible animations one after another
 * Async-waterfall handles callbacks
 */

var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var waterfall = require('async-waterfall');

// Calls the given function
// Then after 3000ms calls the callback
function frame(fn) {
	return function(callback) {
		fn();
		client.after(3000, function() {
			callback();
		});
	}
}

// Array of all animations
var animations = [
	'phiM30Deg', 
	'phi30Deg', 
	'thetaM30Deg', 
	'theta30Deg', 
	'theta20degYaw200deg',
	'theta20degYawM200deg', 
	'turnaround', 
	'turnaroundGodown', 
	'yawShake',
	'yawDance', 
	'phiDance', 
	'thetaDance', 
	'vzDance', 
	'wave', 
	'phiThetaMixed',
	'doublePhiThetaMixed', 
	'flipAhead', 
	'flipBehind', 
	'flipLeft', 
	'flipRight'
];

// Initialize tasks array with first few functions
var tasks = [
	frame(function() { 
		client.calibrate(0);
	}),

	frame(function() { 
		client.up(.2);
	}),

	frame(function() { 
		client.stop();
	})
];

// Push all animations to tasks array
for (var i = 0; i < animations.length; i++) {
	var fn_name = animations[i];
	tasks.push(frame(function() {
		client.animate(fn_name, 1000);
	}));
};

// Push land function to tasks array
tasks.push(frame(function() {
	client.land();
}));


client.takeoff();
waterfall(tasks, function(err, res) {});


