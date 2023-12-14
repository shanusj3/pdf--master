import mongoose from "mongoose";
import env from "../utils/validEnv";

export async function connectToDB() {
  try {
    await mongoose.connect(env.MONGO_URI);
  } catch (error) {
    console.log("unable to connect db" + error);
  }
}

export async function disconnectFromDB() {
  try {
    mongoose.disconnect();
  } catch (error) {
    console.log("cant disconnect from db" + error);
  }
}
