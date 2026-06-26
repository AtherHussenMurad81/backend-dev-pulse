import app from "./app";
import { config } from "./config";

const main = async () => {
  app.listen(config.port, () => {
    console.log(`Server is running on this port ${config.port}`);
  });
};
main();
