const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Remove middleware usage
  // server.all("*", (req, res) => {
  //   return handle(req, res);
  // });

  // Serve static files
  server.use(express.static("out"));

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
