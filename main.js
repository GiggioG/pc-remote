const SimpleTTS = require("simpletts");
const tts = new SimpleTTS();
const ws = require("ws");
const robot = require("robotjs");
const wss = new ws.Server({
  port: 3000
});
wss.on("connection", socket => {
  console.log(
    `remote connected\n${wss.clients.size} remotes currently connected`
  );
  socket.on("message", rawMsg => {
    const msg = JSON.parse(rawMsg);
    switch (msg.op) {
      case "move":
        robot.moveMouse(msg.pos.x, msg.pos.y);
        break;
      case "click":
        robot.mouseClick("left");
        break;
      case "type":
        robot.typeStringDelayed(msg.text, 2000);
        break;
      case "say":
        tts.read(msg.text);
        break;
    }
  });
  socket.on("close", () => {
    console.log(
      `remote disconnected\n${wss.clients.size} remotes currently connected`
    );
  });
});
