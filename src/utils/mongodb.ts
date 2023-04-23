import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) {
  throw new Error("Invalid environment variable");
}
export const connectToMongoDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI as string)
    .then((respone) => console.log("DB connected"));
};
