/* reading from 3.1.3.  I assume that this ocpp extension supports Json */
var ws = new WebSocket("ws://localhost:3000", ["ocpp1.6", "ocpp1.5"]);

ws.onopen = function(){
	// Assumption of connection to charge point
	console.log("Connected to charge point");
}

ws.onmessage = function(payload){
	payload_data = JSON.parse(payload.data);
	console.log(payload_data);
	if(payload_data['auth'] == 'handshake'){

		var messageTypeId = 2;
		var UniqueId = 19223201;
		var Action = "BootNotification";
		var Payload = {"chargePointVendor": "VendorX", "chargePointModel": "SingleSocketCharger"}
		boot_notification = [messageTypeId, UniqueId, Action,Payload]

		ws.send(JSON.stringify(boot_notification));
	}else{
		x = 0;
		if(!payload_data.Payload){
			x = payload_data.heartbeatInterval;
		}else{
			x = payload_data.Payload.heartbeatInterval;
		}
		var timer = setInterval(function(){
			ws.send(JSON.stringify({heart_beat : "heart_beat_cp"}),function (error){
				if(error){
					clearInterval(timer);
					console.log('CS disconnected');
				}
			});
		}, x);
	}
}

ws.onclose = function(){
	console.log("Disconnected");
}
