
document.querySelectorAll('.button.book-now').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();

        const roomElement = button.closest('.room');
        const roomTitle = roomElement.querySelector('h2').textContent;

        showBookingPopup(roomTitle);
    });
});

function showBookingPopup(roomTitle) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-button">&times;</span>
            <h2>Book ${roomTitle}</h2>
            <form id="bookingForm">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="numGuests">Number of Guests:</label>
                <select id="numGuests" name="numGuests" required>
                    <option value="1">1</option>
                </select>
                
                <div id="guestDetails"></div>
                
                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    `;

    document.body.appendChild(popup);

    const closeButton = popup.querySelector('.close-button');
    closeButton.addEventListener('click', () => popup.remove());

    updateGuestDropdown(roomTitle);

    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const numGuests = document.getElementById('numGuests').value;
        if (confirm(`Confirm booking for ${roomTitle} under the name ${name} for ${numGuests} guest(s)?`)) {
            alert('Your booking has been confirmed!');
        }
        popup.remove();
    });
}

function updateGuestDropdown(roomTitle) {
    const numGuestsDropdown = document.getElementById('numGuests');
    numGuestsDropdown.innerHTML = ''; 
    
    let maxGuests = 1;
    if (roomTitle.includes('Double')) {
        maxGuests = 2;
    } else if (roomTitle.includes('Family Hub (4 Guests)')) {
        maxGuests = 4;
    } else if (roomTitle.includes('Family Suite (4 Guests)')) {
        maxGuests = 4;
    } else if (roomTitle.includes('Family Hub (6 Guests)')) {
        maxGuests = 6;
    } else if (roomTitle.includes('Family Suite (6 Guests)')) {
        maxGuests = 6;
    }

    for (let i = 1; i <= maxGuests; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        numGuestsDropdown.appendChild(option);
    }
}

const style = document.createElement('style');
style.textContent = `
    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        background-color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        padding: 20px;
        border-radius: 8px;
        z-index: 1000;
    }
    .popup-content {
        position: relative;
    }
    .popup-content h2 {
        margin-top: 0;
    }
    .popup-content label {
        display: block;
        margin: 10px 0 5px;
    }
    .popup-content input, .popup-content select, .popup-content button {
        width: 100%;
        padding: 8px;
        margin-bottom: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .popup-content button {
        background-color: #f6ac0f;
        color: white;
        cursor: pointer;
    }
    .popup-content button:hover {
        background-color: rgb(248, 142, 13);
    }
    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 24px;
        font-weight: bold;
        color: #333;
        cursor: pointer;
    }
    .close-button:hover {
        color: red;
    }
`;
document.head.appendChild(style);
