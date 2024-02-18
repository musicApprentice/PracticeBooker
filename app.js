// const db2 = new PouchDB('rooms2');

// // Function to initialize the room matrix
// async function initializeRooms() {
//     try {
//         const doc = await db2.get('roomMatrix'); // Use consistent document ID
//         console.log('Room matrix already initialized.');
//     } catch (err) {
//         if (err.name === 'not_found') {
//             // Initialize a 63x21 array of false values
//             const roomMatrix1 = Array(63).fill().map(() => Array(21).fill(false));
//             await db2.put({ // Use db2 here
//                 _id: 'roomMatrix', // Use consistent document ID
//                 matrix: roomMatrix1
//             });
//             console.log('Room matrix initialized.');
//         } else {
//             console.error('An error occurred:', err);
//         }
//     }
// }

// async function book(x, y) {
//     try {
//         const doc = await db2.get('roomMatrix'); // Ensure you're using the correct ID and db2 instance
//         if (doc.matrix[x][y] === false) {
//             doc.matrix[x][y] = true; // Book the room
//             await db2.put({ // Use db2 here
//                 _id: 'roomMatrix',
//                 _rev: doc._rev,
//                 matrix: doc.matrix
//             });
//             console.log(`Room at [${x},${y}] booked successfully.`);
//             // Ensure generateBookingTable is defined and called correctly here
//             // generateBookingTable(); // This needs to be defined elsewhere in your script
//         } else {
//             console.log('Room is already booked.');
//         }
//     } catch (err) {
//         console.error('An error occurred:', err);
//     }
// }
// initializeRooms();

function addSubmitButton() {
  const dropdownContainer = document.getElementById("dropdown-container");
  const selectedOption = document.getElementById("dropdown").value;

  // Create a submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit " + selectedOption; // Change button text as needed
  submitButton.onclick = function () {
    // Perform actions when the submit button is clicked

    filterByRoom(selectedOption);

    alert("Submitted " + selectedOption);
  };

  // Append the submit button to the dropdown container
  dropdownContainer.appendChild(submitButton);
}

// Sample schedule data (2D array)
const scheduleData = [
  [
    "8:00 AM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "9:00 AM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "10:00 AM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "11:00 AM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "12:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "1:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "2:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "3:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "4:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "5:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "6:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "7:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "8:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "9:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],
  [
    "10:00 PM",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
    "Available",
  ],

  // Add more data rows as needed
];

// Function to generate schedule table from data array
function generateScheduleTable(data) {
  const tbody = document.getElementById("schedule-body");
  tbody.innerHTML = ""; // Clear existing content

  // Loop through each row in the data array
  data.forEach((rowData) => {
    const row = document.createElement("tr");

    // Loop through each item in the row
    rowData.forEach((item) => {
      const cell = document.createElement("td");
      if (item === "Available" || item === "Booked") {
        const button = document.createElement("button");
        button.textContent = item;
        button.onclick = () => toggleBooking(button);
        cell.appendChild(button);
      } else {
        cell.textContent = item;
      }
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  });
}

// Function to handle button click (toggle booking status)
function toggleBooking(button) {
  button.classList.toggle("highlighted");
  //button.textContent = button.textContent === 'Available' ? 'Booked' : 'Booked';
  // You can add your logic here to handle booking/cancellation

  //set var to be passed on clicking booking button
}

// Generate the schedule table on page load
window.onload = function () {
  generateScheduleTable(scheduleData);
};

function filterByTime(time) {
  scheduleData.forEach((row) => {
    if (row[0] == time) {
      generateScheduleTable([row]);
    }
  });
}

const roomNumberMappings = [
  { 1: "Room 158" },
  { 2: "Room 159" },
  { 3: "Room 160" },
  { 4: "Room 161" },
  { 5: "Room 162" },
  { 6: "Room 163" },
  { 7: "Room 164" },
  { 8: "Room 165" },
  { 9: "Room 166" },
  { 10: "Room 167" },
  { 11: "Room 168" },
  { 12: "Room 169" },
  { 13: "Room 170" },
];

function filterByRoom(roomNumb) {
  allTimesForRoom = [];

  filteredArray = roomNumberMappings.filter(
    (element) => Object.values(element)[0] === roomNumb
  );
  //Return type of filter is another array
  // [{13:170}]
  index = Object.values(filteredArray[0]);
  //13
  scheduleData.forEach((row) => {
    allTimesForRoom.push(row[index]);
  });
  generateScheduleTable(allTimesForRoom);
}
