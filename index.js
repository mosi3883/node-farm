// const fs = require("fs");
// Sync way, dont use it
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);

// const textOut = `This is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);

// Async

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log("second");
//   if (err) return;
//   //console.log(data);
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err2, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         if (!err) {
//           console.log("write done!");
//         }
//       });
//     });
//   });
// });

// console.log("first");

const http = require("http");

const server = http.createServer((request, response) => {
  console.log("request", request);
  response.end("Hello from server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on http://127.0.0.1:8000 ");
});
