var express = require('express');
var app = express();
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const path = require('path');
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
const ws = new WebSocket.Server({ server });

/* 3.2 Server Response from OCPP_1.6_JSON_Specification.pdf */
ws.on('connection', function connection(ws, req) {
  /* I am assuming that the connection is a OCCPJ connection
  Step 1 If the system does not recognize the charge point close connection immediatly
  */
  // Assuming chargepoints are stored in db and compared
 chargepoint = req.headers["host"];
 if(chargepoint !== 'localhost:3000'){
   /* For now returning status 401 but assuming it will get stored to the
   The db if it does not exist
  */
   return res.status(401).send();
 }
 var websocketprotocol = req.headers["sec-websocket-protocol"];

 var ocpp16 = websocketprotocol.includes("ocpp1.6");
 var ocpp15 = websocketprotocol.includes("ocpp1.5");

  if(ocpp16 == true || ocpp15 == true){
    /* Send back an authentication, for now lets call it handshake and pretend I did all the auths */
    ws.send(JSON.stringify({auth:'handshake'}));

  }else{
    /* lets assume that the websocket protocol is not agreed so send a
     websocketprotocol without the header and close the connection
     */
     ws.terminate();
  }
  ws.on('message', function incoming(message) {
    return_data = JSON.parse(message);
    /* Lets assume the return_data has been checked for whatever information it needs */
      heart_beat =[ return_data[0],
     								return_data[1],
     								 {status:"Accepted", currentTime:"2013-02-01T20:53:32.486Z", "heartbeatInterval":300}
                 ]
     /* Not sure if I should ping it or just send it back as json
        Since I am pinging it, not sure what pong should fire.
      */
      ws.ping(heart_beat);
      ws.send(JSON.stringify(heart_beat));
  });
});
