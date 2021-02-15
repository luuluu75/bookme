const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [];

const waitlist = []

// ROUTES

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/reservation', (req, res) => res.sendFile(path.join(__dirname, '/Assets/reservation.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, '/Assets/tables.html')));

// Displays tables as JSON object 
app.get('/api/tables', (req, res) => res.json(tables));

app.get('/api/waitlist', (req, res) => res.json(waitlist));


// Makes new reservations
app.post('/api/tables', (req, res) => {
    const newReservation = req.body;

    newReservation.routeName = newReservation.resName.replace(/\s+/g, '').toLowerCase();
    console.log(newReservation);

    if (tables.length < 5) {
        tables.push(newReservation);
        alert("You got a table!")
    } else {
        waitlist.push(newReservation);
        alert("You're on the waitlist.")
    }

    res.json(newReservation);
});

// Starts server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
