var arDrone = require('ar-drone');
var client  = arDrone.createClient();

client.takeoff();

client
	.after(1000, function() {
		this.calibrate(0);
	})
  .after(5000, function() {
  	this.up(0.9);
  })
  .after(5000, function() {
		this.animate('flipLeft', 1000);
  })
  .after(3000, function() {
    this.stop();
    this.land();
  });