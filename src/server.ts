import { Server } from "http";
import { app } from "./app";

const main = async () => {
  try {
    const server: Server = app.listen(3000, () => {
      console.log("server running at", 3000);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
