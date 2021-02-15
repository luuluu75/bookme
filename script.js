$(document).ready(function () {


    $('#reserve_submit').addEventListener('click', (e) => {
        e.preventDefault();

        // Question: What does this code do?
        let resName = document.getElementById('reserve_name').value.trim();
        let resPhone = document.getElementById('reserve_phone').value.trim();
        let resId = document.getElementById('reserve_uniqueId').value.trim();

        let newReservation = {
            tableNumber: "",
            resName: resName,
            resPhone: resPhone,
            resId: resId,
        };


        fetch('/api/tables', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReservation),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('reservation.html', data);
                alert(`Adding character: ${data.name}`);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    })

})
