const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  cardioName: {
    type: String,
    trim: true,
    required: "Enter type of cardio work out"
  },

  distance: {
    type: Number,
    required: "Enter distance (miles)"
  },

  cardioDuration: {
    type: Number,
    required: "Enter cardio duration (minutes)"
  },

  resistanceName: {
    type: String,
    trim: true,
    required: "Enter type of resistance work out"
  },

  weight: {
    type: Number,
    required: "Enter weight (lbs)"
  },

  sets: {
    type: Number,
    required: "Enter number of sets"
  },

  reps: {
    type: Number,
    require: "Enter number of reps"
  },

  resistanceDuration: {
    type: Number,
    required: "Enter resistance duration (minutes)"
  },
  
  workoutDate: {
    type: Date,
    default: Date.now
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;