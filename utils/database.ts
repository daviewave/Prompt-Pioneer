import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET need to be set in the environment'
  );
}

let isConnected = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('=> MongoDB is already connected.');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'prompt-pioneer',
    });
    isConnected = true;
    console.log('=> MongoDB connection established successfully.');
  } catch (e) {
    console.log('=> MongoDB connection error: ', e);
    // throw e;
  }
};
