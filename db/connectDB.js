const mongoose = require("mongoose");
const live_url =
  "mongodb+srv://sumit:sumit10@cluster0.qol4gk3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  return mongoose
    .connect(process.env.LIVE_URL)

    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDB;
