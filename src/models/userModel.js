import mongoose from "mongoose";
import { USER } from "../../constants.js";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [
      50,
      "First name must be less than or equal to 50 characters long",
    ],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [
      50,
      "Last name must be less than or equal to 50 characters long",
    ],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email must be unique"],
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  dateOfBirth: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: "user",
  },
  events: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
      required: false,
    },
  ],
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "events",
    select: "-_id -organizer",
  });
  next();
});

userSchema.post("save", function (doc) {
  doc._doc = { ...doc._doc };
  delete doc._doc.__v;
  if (doc._doc.role === USER) delete doc._doc.events;
});

userSchema.pre(/^find/, function (next) {
  this.select("-__V");
  next();
});

const Users = mongoose.model("Users", userSchema);

export default Users;
