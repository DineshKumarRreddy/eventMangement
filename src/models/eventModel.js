import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [50, "description must be at least 50 characters long"],
    maxlength: [
      250,
      "description must be less than or equal to 250 characters long",
    ],
  },
  organizer: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
});

// eventSchema.virtual("subscribers", {
//   ref: "Users",
//   foreignField: "events",
//   localField: "_id",
// });

eventSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

eventSchema.post("save", function (doc) {
  doc._doc = { ...doc._doc };
  delete doc._doc.__v;
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
