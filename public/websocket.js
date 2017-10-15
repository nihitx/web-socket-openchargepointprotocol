/* reading from 3.1.3.  I assume that this ocpp extension supports Json */
var ws = new WebSocket("ws://localhost:3000", ["ocpp1.6", "ocpp1.5"]);

ws.onopen = function(){
	// Assumption of connection to charge point
	console.log("Connected to charge point");
 /* Now lets pretend that the charge point is sending data to the server for the firs time
  I am assuming that this is where the handshake section falls into with auth
 */
}

ws.onmessage = function(payload){
	payload_data = JSON.parse(payload.data);
	if(payload_data['auth'] == 'handshake'){
		boot_notification = [2,
 												"19223201",
 												"BootNotification",
 													{"chargePointVendor": "VendorX", "chargePointModel": "SingleSocketCharger"}
												]
	ws.send(JSON.stringify(boot_notification));
	}else{
		console.log(payload_data);
	}
}

ws.onclose = function(){
	console.log("Disconnected");
	ws.send('Disconnected');
}
