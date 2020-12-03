const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define workout schema
const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },

    exercises: [
      {
        name: {
          type: String,
          trim: true,
          required: 'Enter name of excercise!'
        },

        weight: {
          type: Number,
          required: 'Enter weight!'
        },

        sets: {
          type: Number,
          required: 'Enter number of sets!'
        },

        reps: {
          type: Number,
          required: 'Enter number of reps!'
        },

        duration: {
          type: Number,
          required: 'Enter duration!'
        },

        distance: {
          type: Number,
          required: 'Enter distance!'
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

workoutSchema.virtual('totalDuration').get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;