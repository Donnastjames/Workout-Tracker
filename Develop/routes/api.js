const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", ({ body }, res) => {
  Workout
    .create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  console.log('GET /api/workouts CALLED!');
  Workout
    .find({})
    // .sort({ date: -7 }) // Didn't work!
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


module.exports = router;