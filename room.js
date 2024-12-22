document.querySelectorAll('.button.book-now').forEach(button => {
    button.addEventListener('click', event => {
        event.preventDefault();

        const roomElement = button.closest('.room');
        const roomTitle = roomElement.querySelector('h2').textContent;

        showBookingPopup(roomTitle);
    });
});

function showBookingPopup(roomTitle) {
    const overlay = document.createElement('div');
    overlay.classList.add('popup-overlay');

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-button">&times;</span>
            <h2>Book ${roomTitle}</h2>
            <form id="bookingForm">
                <div class="form-columns">
                    <div class="form-column">
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name" required>
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" required>
                        <label for="contact">Contact Number:</label>
                        <input type="tel" id="contact" name="contact" required>
                        <label for="checkin">Check-in Date:</label>
                        <input type="date" id="checkin" name="checkin" required>
                        <label for="checkout">Check-out Date:</label>
                        <input type="date" id="checkout" name="checkout" required>
                    </div>
                    <div class="form-column">
                        <label for="numGuests">Number of Guests:</label>
                        <select id="numGuests" name="numGuests" required></select>
                        <label for="gender">Gender:</label>
                        <select id="gender" name="gender" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label for="category">Category:</label>
                        <select id="category" name="category" required>
                            <option value="child">Child</option>
                            <option value="adult">Adult</option>
                            <option value="old">Old</option>
                        </select>
                        <label for="requests">Special Requests (Optional):</label>
                        <textarea id="requests" name="requests"></textarea>
                        <button type="submit">Confirm Booking</button>
                    </div>
                </div>
            </form>
        </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const closeButton = popup.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        overlay.remove();
        document.body.style.overflow = '';
    });

    overlay.addEventListener('click', event => {
        if (event.target === overlay) {
            overlay.remove();
            document.body.style.overflow = '';
        }
    });

    updateGuestDropdown(roomTitle);

    const numGuestsDropdown = document.getElementById('numGuests');
    numGuestsDropdown.addEventListener('change', updateGuestDetails);

    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', event => {
        event.preventDefault();
        console.log("Submit event triggered"); // Debugging statement
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;
        const checkin = new Date(document.getElementById('checkin').value);
        const checkout = new Date(document.getElementById('checkout').value);
        const numGuests = document.getElementById('numGuests').value;
    
        console.log("Form values retrieved:", { name, email, contact, checkin, checkout, numGuests });
    
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to midnight for date comparison
    
        if (checkin <= today) {
            alert('Check-in date must be after today.');
            console.log("Check-in validation failed");
            return;
        }
    
        if (checkout <= checkin) {
            alert('Check-out date must be after the check-in date.');
            console.log("Check-out validation failed");
            return;
        }
    
        localStorage.setItem('name', name);
        localStorage.setItem('contact', contact);
        localStorage.setItem('numGuests', numGuests);

        alert(`Hello ${name}! Welcome to Luna Vista, Thank you!`);
        console.log("Welcome alert triggered");
    
        localStorage.setItem('hasBookedBefore', 'true');
    
        if (confirm(`Confirm booking for ${roomTitle} under the name ${name} for ${numGuests} guest(s)?`)) {
            alert('Your booking has been confirmed!');
            console.log("Booking confirmed");
        } else {
            console.log("Booking not confirmed");
        }
    
        overlay.remove();
        document.body.style.overflow = ''; 
    });
        
}

function updateGuestDropdown(roomTitle) {
    const numGuestsDropdown = document.getElementById('numGuests');
    numGuestsDropdown.innerHTML = '';
    let maxGuests = 1;
    if (roomTitle.includes('Double')) {
        maxGuests = 2;
    } else if (roomTitle.includes('Family Hub (4 Guests)') || roomTitle.includes('Family Suite (4 Guests)')) {
        maxGuests = 4;
    } else if (roomTitle.includes('Family Hub (6 Guests)') || roomTitle.includes('Family Suite (6 Guests)')) {
        maxGuests = 6;
    }

    for (let i = 1; i <= maxGuests; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        numGuestsDropdown.appendChild(option);
    }

    updateGuestDetails();
}

function updateGuestDetails() {
    const numGuests = parseInt(document.getElementById('numGuests').value, 10);
    const guestDetailsContainer = document.getElementById('guestDetails');

    guestDetailsContainer.innerHTML = '';

    const guestDiv = document.createElement('div');
    guestDiv.classList.add('form-row');
    guestDiv.innerHTML = `
        <h4>Guest Details</h4>
        <label for="gender">Gender:</label>
        <select id="gender" name="gender" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </select>

        <label for="category">Category:</label>
        <select id="category" name="category" required>
            <option value="child">Child</option>
            <option value="adult">Adult</option>
            <option value="old">Old</option>
        </select>
    `;
    guestDetailsContainer.appendChild(guestDiv);
}

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'room.css';
document.head.appendChild(link);
