import { app } from "./app";

const main = async () => {
  try {
    app.listen(3000, () => {
      console.log("server running at", 3000);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
