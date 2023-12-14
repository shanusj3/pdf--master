import app from "./app";
import { connectToDB, disconnectFromDB } from "./db/connect";
import env from "./utils/validEnv"

const PORT = env.PORT || 3000;

connectToDB()
  .then(() => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log("server is running on: " + PORT);
    });
  })
  .catch(() => disconnectFromDB());
