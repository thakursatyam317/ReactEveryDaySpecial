import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    mobileNumber: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    dob: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    pic: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
