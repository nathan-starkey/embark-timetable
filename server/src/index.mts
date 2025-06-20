import express from "express";

const PORT = process.env.PORT;
const app = express();

if (PORT == undefined) {
  console.log("Port is undefined, check \".env\" file.");
} else {
  app.use("/", express.static("public"));
  app.use("/js", express.static("client/dist"));

  app.listen(PORT, (error) => {
    if (error) {
      return console.log("Failed to start the server: " + error.stack);
    }

    console.log("Started listening on port " + PORT);
  });
}