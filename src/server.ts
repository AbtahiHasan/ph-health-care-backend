import { Server } from "http";
import { app } from "./app";
import config from "./app/config";

const main = async () => {
  try {
    const server: Server = app.listen(config.port, () => {
      console.log("server running at", config.port);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
