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

router.put("/api/workouts/:id", (req, res) => {
  console.log('PUT /api/workouts/:id called with id:', req.params.id);
  console.log('req.body:\n', JSON.stringify(req.body, null, 2));
  Workout
    .updateOne(
      {
        _id: req.params.id,
      },
      {
        $push: { exercises: req.body },
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      },
    );
});

router.get("/api/workouts", (req, res) => {
  console.log('GET /api/workouts CALLED!');
  Workout
    .find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


module.exports = router;