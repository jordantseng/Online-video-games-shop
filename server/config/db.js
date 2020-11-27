import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error}`);
    process.exit(1); // exit with failure
  }
};

export default connectDB;
