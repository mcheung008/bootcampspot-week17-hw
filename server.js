const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('mongodb connected'));

// HTML routes, more than one
app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/exercise.html'))
});

// API routes
app.get('/api/workouts', (req, res) => {
    Workout.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
});


app.listen(PORT, () => {
    console.log('app running on port ' + PORT)
});

