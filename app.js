const db2 = new PouchDB("rooms2");
let highlightedCell = null;
let highlightedIndex = null;
let savedTime = null;
let savedRoom = null;

//Dropdown button for choose availability by room
function addSubmitButton() {
  const dropdownContainer = document.getElementById("dropdown-container");
  const selectedOption = document.getElementById("dropdown").value;

  // Create a submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit " + selectedOption; // Change button text as needed
  submitButton.onclick = function () {
    // Perform actions when the submit button is clicked
    submitButton.submit - button();
    alert("Submitted " + selectedOption);
  };

  // Append the submit button to the dropdown container
  dropdownContainer.appendChild(submitButton);
}

const timeRoomData = [
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

// Function to initialize the room matrix
async function initializeRooms() {
  try {
    const doc = await db2.get("roomMatrix1"); // Use consistent document ID
    console.log("Room matrix already initialized.");
  } catch (err) {
    if (err.name === "not_found") {
      const roomMatrix1 = timeRoomData;
      await db2.put({
        // Use db2 here
        _id: "roomMatrix1", // Use consistent document ID
        matrix: roomMatrix1,
      });
      console.log("Room matrix initialized.");
    } else {
      console.error("An error occurred:", err);
    }
  }
}

async function book(x, y) {
  try {
    const doc = await db2.get("roomMatrix1");
    if (doc.matrix[x][y] === "Available") {
      doc.matrix[x][y] = "Unavailable";
      await db2.put({
        _id: "roomMatrix1",
        _rev: doc._rev,
        matrix: doc.matrix,
      });
      alert(`Room booked successfully.`);
      generateScheduleTable(doc.matrix);
    } else {
      alert("Cannot book. Room is already booked.");
    }
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

async function unbook(x, y) {
  try {
    const doc = await db2.get("roomMatrix1");
    if (doc.matrix[x][y] === "Unavailable") {
      doc.matrix[x][y] = "Available";
      await db2.put({
        _id: "roomMatrix1",
        _rev: doc._rev,
        matrix: doc.matrix,
      });
      alert(`Room unbooked successfully.`);
      generateScheduleTable(doc.matrix);
    } else {
      alert("Cannot unbook. Room is not booked yet.");
    }
  } catch (err) {
    console.error("An error occurred:", err);
  }
}

async function resetRooms() {
  try {
    const doc = await db2.get("roomMatrix1"); // Ensure you're using the correct ID and db2 instance
    // Create a new 63x21 array of false values to reset the booking status
    const newRoomMatrix = timeRoomData;
    // Update the document with the new matrix
    await db2.put({
      _id: "roomMatrix1",
      _rev: doc._rev, // Include the revision to update the document
      matrix: newRoomMatrix,
    });
    generateScheduleTable(newRoomMatrix);

    console.log("All rooms have been reset successfully.");
    // Optionally, update the UI to reflect these changes
    // generateBookingTable(); // This needs to be defined elsewhere in your script
  } catch (err) {
    console.error("An error occurred while resetting rooms:", err);
  }
}

initializeRooms();

function addSubmitButton() {
  const dropdownContainer = document.getElementById("dropdown-container");
  const selectedOption = document.getElementById("dropdown").value;

  // Create a submit button
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit " + selectedOption; // Change button text as needed
  submitButton.onclick = function () {
    // Perform actions when the submit button is clicked
    submitButton.submit - button();
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
  // if (savedRoom !== null) {
  //   // var table = document.getElementById("schedule")
  //   // table.deleteTHead();
  //   // var header = table.createTHead();
  //   // var newrow = header.insertRow(0);
  //   // var headers = Array.from(timeMapping);
  //   // headers.unshift("Room");
  //   // for (let i = 0; i < headers.length; i++) {
  //   //   var newcell = newrow.insertCell(i);
  //   //   newcell.innerHTML = headers[i];
  //   //   newcell.style.color = "white";
  //   //   newcell.style.backgroundColor = "maroon";
  //   // }
  //   resetTitleAsTime();
  // } 
  if (savedTime !== null) {
    resetTitleAsRoomNumber();
  } 
  if (savedRoom !== null) {
    resetTitleAsTime();
  }
  // if (savedTime === null && savedRoom === null) {
  //   resetheader();
  // }
  tbody.innerHTML = ""; // Clear existing content

  // Function to toggle highlighting
  function toggleHighlight(cell, index) {
    // Remove highlight from all cells
    const allCells = document.querySelectorAll(".time-slot");
    allCells.forEach((cell) => {
      cell.classList.remove("highlighted");
    });

    // Highlight the clicked cell
    cell.classList.add("highlighted");

    // Update global variables
    highlightedCell = cell;
    highlightedIndex = index;
  }

  // Loop through each row in the data array
  data.forEach((rowData, rowIndex) => {
    const row = document.createElement("tr");

    // Loop through each item in the row
    rowData.forEach((item, cellIndex) => {
      const cell = document.createElement("td");
      cell.classList.add("time-slot"); // Add 'time-slot' class to each cell
      if (item === "Available" || item === "Unavailable") {
        const button = document.createElement("button");
        button.textContent = item;
        button.onclick = () => {
          toggleHighlight(cell, { rowIndex, cellIndex }); // Highlight the cell
          //toggleBooking(button); // Perform booking or cancellation
        };
        cell.appendChild(button);
        if (item === "Unavailable") {
          // Add the 'unavailable' class to cells with "Unavailable"
          cell.classList.add("unavailable");
        }
      } else {
        cell.textContent = item;
      }
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });
}
// Function to handle button click (toggle booking status)
// function toggleBooking(button) {
//   button.classList.toggle('highlighted');
//   //button.textContent = button.textContent === 'Available' ? 'Booked' : 'Booked';
//   // You can add your logic here to handle booking/cancellation

//   //set var to be passed on clicking booking button
// }

// Generate the schedule table on page load
window.onload = async function () {
  var data = await db2.get("roomMatrix1");
  data = data.matrix;
  generateScheduleTable(data);
  initializeRooms();
};

async function resetheader() {
  savedRoom = null;
  savedTime = null;
  var data = await db2.get("roomMatrix1");
  data = data.matrix;
  generateScheduleTable(data);
  initializeRooms();
};

function animateSearchByTime() {
  const button = document.querySelector(".submit-button1");
  button.classList.add("flash-animation");
  setTimeout(function () {
    button.classList.remove("flash-animation");
  }, 250); // Adjust the duration of the flash as needed
  // Call the searchByTime function after the animation is complete
  setTimeout(searchByTime, 250); // Adjust the time as needed
}

function animateSearchByRoom() {
  const button = document.querySelector(".submit-button");
  button.classList.add("flash-animation");
  setTimeout(function () {
    button.classList.remove("flash-animation");
  }, 250); // Adjust the duration of the flash as needed
  // Call the searchByTime function after the animation is complete
  setTimeout(searchByRoom, 250); // Adjust the time as needed
}

const timeMapping = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM",
"3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];

async function searchByTime() {

  let time = document.getElementById('dropdown2').value;
  savedRoom = null;
  savedTime = time;

  //show animation before table updates:
  const dropdown = document.getElementById('dropdown2');
  dropdown.style.opacity = 1;

  var doc = await db2.get("roomMatrix1");
  doc = doc.matrix;
  realtime = timeMapping.indexOf(savedTime);
  let templine = doc[realtime];

  templine[0] == time ? generateScheduleTable([templine]) : false
  //resetTitleAsRoomNumber();

  // templine.forEach((row) =>
  //   row[0] == time ? generateScheduleTable([row]) : false
  // );
}

function resetTitleAsRoomNumber() {
  var table = document.getElementById("schedule")
  table.deleteTHead();
  var header = table.createTHead();
  var newrow = header.insertRow(0);
  var headers = Array.from(roomNumberMappings);
  headers.unshift("Time");
  for (let i = 0; i < headers.length; i++) {
    var newcell = newrow.insertCell(i);
    newcell.innerHTML = headers[i];
    newcell.style.color = "white";
    newcell.style.backgroundColor = "maroon";
  }
}

function resetTitleAsTime() {
  var table = document.getElementById("schedule")
  table.deleteTHead();
  var header = table.createTHead();
  var newrow = header.insertRow(0);
  var headers = Array.from(timeMapping);
  headers.unshift("Time");
  for (let i = 0; i < headers.length; i++) {
    var newcell = newrow.insertCell(i);
    newcell.innerHTML = headers[i];
    newcell.style.color = "white";
    newcell.style.backgroundColor = "maroon";
  }
}

async function submitBooking(bookFnc) {
  if (bookFnc) {
    bookFnc = book;
  }
  else {
    bookFnc = unbook;
  }
  if (highlightedCell && highlightedIndex) {
    console.log('Highlighted cell:', highlightedCell);
    console.log('Highlighted index:', highlightedIndex);

    if (savedTime == null) {
      if (savedRoom !== null) {
        var cellidx = highlightedIndex.cellIndex;
        const doc = await db2.get('roomMatrix1');
        roomidx = roomNumberMappings.indexOf(savedRoom);
        bookFnc(cellidx - 1, roomidx + 1)
        savedRoom = null;
        //resetTitleAsTime();

        // var table = document.getElementById("schedule")
        // table.deleteTHead();
        // var header = table.createTHead();
        // var newrow = header.insertRow(0);
        // var headers = Array.from(roomNumberMappings);
        // headers.unshift("Time");
        // for (let i = 0; i < headers.length; i++) {
        //   var newcell = newrow.insertCell(i);
        //   newcell.innerHTML = headers[i];
        //   newcell.style.color = "white";
        //   newcell.style.backgroundColor = "maroon";
        // }
        // var data = await db2.get("roomMatrix1");
        // data = data.matrix;
        // generateScheduleTable(data);
        // initializeRooms();
      } else {
        bookFnc(highlightedIndex.rowIndex, highlightedIndex.cellIndex)
      }
    } else {
      var cellidx = highlightedIndex.cellIndex;
      const doc = await db2.get('roomMatrix1');
      realtime = timeMapping.indexOf(savedTime);
      bookFnc(realtime, cellidx)
      savedTime = null;
    }

    const allCells = document.querySelectorAll('.time-slot');
    allCells.forEach(cell => {
      cell.classList.remove('highlighted');
    });
    resetTitleAsRoomNumber();
    // Perform actions using highlightedCell and highlightedIndex
  } else {
    console.log("Please Select a Time");
    resetTitleAsRoomNumber();
    resetheader();
    return;
  }
  

}

const roomNumberMappings = ["Room 158","Room 159","Room 160","Room 161" ,"Room 162" ,"Room 163" ,
  "Room 164","Room 165","Room 166","Room 167","Room 168","Room 169","Room 170"];

async function searchByRoom() {
  var room = document.getElementById("dropdown1").value;
  room = "Room " + room; 
  savedRoom = room;
  savedTime = null;

  //show animation before table updates:
  const dropdown = document.getElementById('dropdown1');
  dropdown.style.opacity = 1;

  var doc = await db2.get("roomMatrix1");
  doc = doc.matrix;
  roomIdx = roomNumberMappings.indexOf(savedRoom) + 1;
  function extractColumn(array, columnIndex) {
    return array.map(row => row[columnIndex])
  }
  var templine = extractColumn(doc, roomIdx);
  templine.unshift(savedRoom)

  templine[0] == savedRoom ? generateScheduleTable([templine]) : false

  // templine.forEach((row) =>
  //   row[0] == time ? generateScheduleTable([row]) : false
  // );
}