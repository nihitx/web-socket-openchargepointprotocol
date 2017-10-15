# web-socket-openchargepointprotocol

Purpose of this repo is to replicate a method done by Open Charge Point Protocol.
### Getting started
> Running the repo
  - Clone the repo
  - Run the following command `npm install`
  - Run the following command `node index.js`
  - Go to your web browser and type `localhost:3000`

  There you have it, a running prototype, view the console to see whats happening.


> Break down `Front end`

I assumed that when a charge point is activated it sends a call to the server with `Auth` and the `protocol` information. This code below is to replicate that the ocpp1.6 is JSON based, no auth is specified in the url.
```sh
var ws = new WebSocket("ws://localhost:3000", ["ocpp1.6", "ocpp1.5"]);
```

I am assuming that a handshake it formed in the backend and if the chargepoint is not available in the database it's created and a response is sent back with the auth,
I pretend that after the front-end gets that response I send back the bootnotification information.

> Break down `Back end`

When the chargepoint is connected, backend figures out what format the data is ocppj or ocpps. Since this example is based on `JSON` I pretend that its based on Json.
1) The back end first notifies the chargepoint that there has been a connection via `Handshake`
2) The backend receive's bootnotification from the chargepoint and sends a ping ( Which I am sending as JSON and `ws.ping()`. I am assuming this might be a `set interval function` since it needs to be done multiple of times but I am killing it after one try.

### Final
To sum up the whole thing, I drew a diagram on what my thinking is while building this system.

![Picture](https://github.com/nihitx/web-socket-openchargepointprotocol/blob/master/Virta.png)

### Author
Masnad
