import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    mobile: {
      type: String,
      unique: true,
    },
    id: String,
    name: String,
    photoName: String,
    url: String,
    createdAt: String,
    password: {
      type: String,
      select: true,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.userteacher ||
  mongoose.model("userApp", userSchema, "userApp");

export default User;
