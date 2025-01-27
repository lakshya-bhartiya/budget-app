const http = require("http");

const server = http.createServer(function (req, res) {
  const { url: route } = req;
  if (route == "/home") {
    res.write("Home page");
  }
  if (route == "/users") {
    res.write("user page");
  }

  res.end();
});
server.listen(8000);