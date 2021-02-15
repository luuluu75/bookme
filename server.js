const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [
    {
        tableNumber: 'tableOne',
        reservationName: ''
    },
    {
        tableNumber: 'tableTwo',
        reservationName: ''
    },
    {
        tableNumber: 'tableThree',
        reservationName: ''
    },
    {
        tableNumber: 'tableFour',
        reservationName: ''
    },
    {
        tableNumber: 'tableFive',
        reservationName: ''
    }
];

const waitlist = []

// ROUTES

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/reservation', (req, res) => res.sendFile(path.join(__dirname, 'reservation.html')));

app.get('/tables', (req, res) => res.sendFile(path.join(__dirname, 'tables.html')));

// Displays tables as JSON object 
app.get('/api/tables', (req, res) => res.json(tables));

// Makes new reservations
app.post('/api/tables', (req, res) => {
    const newReservation = req.body;

    newReservation.routeName = newReservation.reservationName.replace(/\s+/g, '').toLowerCase();
    console.log(newReservation);

    if (tables.length < 5) {
        tables.push(newReservation);
    } else {
        waitlist.push(newReservation);
    }

    res.json(newReservation);
});

// Starts server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
