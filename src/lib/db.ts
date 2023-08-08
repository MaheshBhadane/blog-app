import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log(":convenience_store:[Database]: DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log(":convenience_store:[Database]: DB connection failed");
    console.error(error);
    process.exit(1);
  }
};

export default connect;
