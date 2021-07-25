const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },

  exercises: [{
    type: {
      type: String,
      trim: true,
      required: "Enter type of work out"
    },
  
    name: {
      type: String,
      trim: true,
      required: "Enter workout name"
    },
  
    duration: {
      type: Number,
      required: "Enter resistance duration (minutes)"
    },
  
    weight: {
      type: Number,
      required: "Enter weight (lbs)"
    },
  
    reps: {
      type: Number,
      require: "Enter number of reps"
    },
  
    sets: {
      type: Number,
      required: "Enter number of sets"
    },
  
    distance: {
      type: Number,
      required: "Enter distance (miles)"
    },
  }],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;