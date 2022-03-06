const esbuild = require("esbuild");
const fs = require("fs");
const http = require("http");

let response;

//创建sse服务器
http
  .createServer((_, res) => {
    response = res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
  })
  .listen(5000);

//hack:使用esbuild host一个网站
esbuild
  .serve(
    {
      servedir: "src",
    },
    {}
  )
  .then(() => {
    console.log("http://localhost:8000/example");
  });

fs.watch("./src", { recursive: true }, () => {
  response.write("data: \n\n");
});
