# Hotel Reservation System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Data Persistence](#data-persistence)
- [Error Handling](#error-handling)
- [Future Enhancements](#future-enhancements)

---

## Introduction
The **Hotel Reservation System** is a console-based application designed to manage room availability and facilitate a seamless booking process. Users can check available rooms, make reservations, view booking details, and manage bookings through an interactive interface. Data is persisted using Local Storage or Session Storage.

---

## Features

### User Interface
- Simple, user-friendly console-based interface.
- Prompts to check room availability, make reservations, and view booking details.
- Input validation for room type, dates, and booking information.

  ![Screenshot (86)](https://github.com/user-attachments/assets/b4fdaa89-b066-44dd-9829-00d52d4b47f8)

### Room Availability
- Displays a list of available rooms based on the selected date range.
- Includes room types (e.g., single, double, suite) with their prices.
- Filters rooms based on availability and user preferences.
![Screenshot (88)](https://github.com/user-attachments/assets/122e6f02-2516-4cdc-93c7-30a8e97ca46a)

### Booking Process
- Reserve a room from the list of available options.
- Collects guest details: name, contact number, check-in, and check-out dates.
- Confirms booking and provides a unique reference number.
- Allows viewing and canceling existing bookings.
  ![Screenshot 2024-12-27 001421](https://github.com/user-attachments/assets/fb759d60-2f0d-4282-a9b7-ad1888d11374)

### Data Storage
- Saves room availability and booking details in Local Storage or Session Storage for persistence during the session.
- Stores reservation data across page reloads and browser sessions.

### Search Functionality
- Allows searching for rooms by date, type, and price range.

### Additional Features
- Displays booking confirmation with a unique reference number.
- Enables viewing booking history and current reservations.

---

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Logic Implementation:** DOM Manipulation for interactive functionalities
- **Storage:** Local Storage or Session Storage

---

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/hotel-reservation-system.git
    ```
2. Navigate to the project directory:
    ```bash
    cd hotel-reservation-system
    ```
3. Open the `index.html` file in a browser to launch the application.

---

## Usage

1. Launch the application in your browser.
2. Use the console interface to:
    - Check room availability.
    - Make reservations by entering guest details.
    - View or cancel existing bookings.
3. All booking and room data is saved in the browser's Local Storage or Session Storage.

---

## Data Persistence
- Booking data and room availability are saved using Local Storage or Session Storage.
- Data remains intact even after page reloads or browser sessions.

---

## Error Handling
- Validates user input for correctness, including:
  - Valid room types
  - Valid check-in and check-out dates
- Displays user-friendly error messages for invalid inputs or unavailable rooms.

---

## Future Enhancements
- Add a graphical user interface (GUI) for enhanced user interaction.
- Integrate a backend system for real-time room availability updates.
- Enable payment gateway integration for secure online payments.
- Deploy the system on platforms like GitHub Pages, Netlify, or Docker for easy access.

---

Feel free to contribute to this project by raising issues or submitting pull requests!
