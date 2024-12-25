class RoomAvailabilityManager {
    constructor() {
        this.initializeAvailabilityData();
    }

    initializeAvailabilityData() {
        const storedData = localStorage.getItem('roomAvailability');
        if (storedData) {
            this.availabilityData = JSON.parse(storedData);
        } else {
            this.availabilityData = {};
            const roomTypes = [
                'Cozy Solo Retreat',
                'Elite Solo Haven',
                'Classic Duo Escape',
                'Grand Couple Retreat',
                'Comfort Family Hub (4 Guests)',
                'Luxury Family Suite (4 Guests)',
                'Spacious Family Hub (6 Guests)',
                'Premium Family Suite (6 Guests)'
            ];

            roomTypes.forEach(roomType => {
                this.availabilityData[roomType] = this.initializeRoomAvailability();
            });
            this.saveAvailabilityData();
        }
    }

    initializeRoomAvailability() {
        const availability = {};
        const today = new Date();
        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            availability[dateStr] = {
                available: true,
                bookings: []
            };
        }
        return availability;
    }

    saveAvailabilityData() {
        localStorage.setItem('roomAvailability', JSON.stringify(this.availabilityData));
    }

    checkAvailability(roomType, checkIn, checkOut) {
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const roomData = this.availabilityData[roomType];

        if (!roomData) return false;

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            if (!roomData[dateStr] || !roomData[dateStr].available) {
                return false;
            }
        }
        return true;
    }

    bookRoom(roomType, checkIn, checkOut, bookingDetails) {
        if (!this.checkAvailability(roomType, checkIn, checkOut)) {
            return false;
        }

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const bookingId = this.generateBookingId();

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            if (this.availabilityData[roomType][dateStr]) {
                this.availabilityData[roomType][dateStr].available = false;
                this.availabilityData[roomType][dateStr].bookings.push({
                    ...bookingDetails,
                    bookingId,
                    checkIn,
                    checkOut
                });
            }
        }

        this.saveAvailabilityData();
        return bookingId;
    }

    generateBookingId() {
        return 'BK' + Date.now() + Math.random().toString(36).substr(2, 5);
    }
}


const availabilityManager = new RoomAvailabilityManager();

// Event listener for book now buttons
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
            <div class="availability-status" style="margin: 15px 0; padding: 10px; border-radius: 4px;">
                <p class="status-text" style="font-weight: bold;">Please select check-in and check-out dates</p>
            </div>
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
                        <input type="date" id="checkin" name="checkin" required min="${new Date().toISOString().split('T')[0]}">
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

    // Setup close button
    const closeButton = popup.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        overlay.remove();
        document.body.style.overflow = '';
    });

    // Setup overlay click to close
    overlay.addEventListener('click', event => {
        if (event.target === overlay) {
            overlay.remove();
            document.body.style.overflow = '';
        }
    });

    // Setup number of guests dropdown
    updateGuestDropdown(roomTitle);

    // Setup date change handlers
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const statusText = popup.querySelector('.status-text');

    function updateAvailabilityStatus() {
        const checkin = checkinInput.value;
        const checkout = checkoutInput.value;

        if (checkin && checkout) {
            const isAvailable = availabilityManager.checkAvailability(roomTitle, checkin, checkout);
            statusText.textContent = isAvailable ? 
                '✅ Room is available for selected dates' : 
                '❌ Room is not available for selected dates';
            statusText.style.color = isAvailable ? '#4caf50' : '#f44336';
        } else {
            statusText.textContent = 'Please select check-in and check-out dates';
            statusText.style.color = '#666';
        }
    }

    checkinInput.addEventListener('change', () => {
        // Update minimum date for checkout
        const checkinDate = new Date(checkinInput.value);
        checkinDate.setDate(checkinDate.getDate() + 1);
        checkoutInput.min = checkinDate.toISOString().split('T')[0];
        updateAvailabilityStatus();
    });

    checkoutInput.addEventListener('change', updateAvailabilityStatus);

    // Setup form submission
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', event => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const numGuests = document.getElementById('numGuests').value;
        const gender = document.getElementById('gender').value;
        const category = document.getElementById('category').value;
        const requests = document.getElementById('requests').value;

        // Validate dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);

        if (checkinDate <= today) {
            alert('Check-in date must be after today.');
            return;
        }

        if (checkoutDate <= checkinDate) {
            alert('Check-out date must be after check-in date.');
            return;
        }

        // Check availability
        if (!availabilityManager.checkAvailability(roomTitle, checkin, checkout)) {
            alert('Sorry, this room is not available for the selected dates.');
            return;
        }

        // Book the room
        const bookingDetails = {
            name,
            email,
            contact,
            numGuests,
            gender,
            category,
            requests
        };

        const bookingId = availabilityManager.bookRoom(roomTitle, checkin, checkout, bookingDetails);

        if (bookingId) {
            // Store booking info
            const userBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
            userBookings.push({
                bookingId,
                roomTitle,
                checkIn: checkin,
                checkOut: checkout,
                ...bookingDetails
            });
            localStorage.setItem('userBookings', JSON.stringify(userBookings));

            // Store user info for future use
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('contact', contact);
            localStorage.setItem('hasBookedBefore', 'true');

            alert(`Booking Confirmed!\nBooking ID: ${bookingId}\nThank you for choosing Luna Vista!`);
            overlay.remove();
            document.body.style.overflow = '';
        } else {
            alert('There was an error processing your booking. Please try again.');
        }
    });
}

function updateGuestDropdown(roomTitle) {
    const numGuestsDropdown = document.getElementById('numGuests');
    numGuestsDropdown.innerHTML = '';
    let maxGuests = 1;

    if (roomTitle.includes('Classic Duo Escape') || roomTitle.includes('Grand Couple Retreat')) {
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
}

// Add CSS link
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'room.css';
document.head.appendChild(link);