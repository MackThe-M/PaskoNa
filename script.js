let selectedShapeId = null;
let selectedName = null;
let hasSubmitted = false;

// Define names for each shape (shape 1 to shape 16)
const shapeNames = [
    "Burna", "Te KIM", "Treswin", "Eva Gwapa", "Allan BZ", "Inda", "Nelma", "Jeed Dili Manglimpyo", 
    "Daddy ni Kim", "KingKer", "Te Badi", "Feng", "Bongki", "Shape 14", "Shape 15", "Bagdem"
];


// Host password (only known to the host)
const hostPassword = "your-host-password"; // Replace this with your password


window.onload = function () {
    const savedChoice = localStorage.getItem('selectedShape');
    if (savedChoice) {
        lockShapes(savedChoice);
        displaySelection(savedChoice);
        document.getElementById('submitBtn').disabled = true;
        hasSubmitted = true;
    }
};

// Function to handle shape selection
function chooseShape(shapeId) {
    if (hasSubmitted || localStorage.getItem('selectedShape')) return; // Prevent multiple submissions

    // Remove previous selection if any
    const previousSelection = document.querySelector('.shape.selected');
    if (previousSelection) previousSelection.classList.remove('selected');

    // Highlight the selected shape
    const shape = document.getElementById(`shape${shapeId}`);
    shape.classList.add('selected');
    selectedShapeId = shapeId;
    selectedName = shapeNames[shapeId - 1]; // Assign the name of the selected shape

    // Enable the submit button
    document.getElementById("submitBtn").disabled = false;
}

// Function to lock shapes after selection
function lockShapes(chosenShapeId) {
    document.querySelectorAll('.shape').forEach((shape) => {
        if (shape.id === `shape${chosenShapeId}`) {
            shape.classList.add('chosen'); // Mark the shape as chosen
        } else {
            shape.style.pointerEvents = "none"; // Disable clicks on other shapes
        }
    });
}

// Function to display the selected name after submission
function displaySelection(shapeId) {
    const name = shapeNames[shapeId - 1]; // Get the name for the selected shape
    document.getElementById("name").textContent = `You have selected: ${name}`; // Display name

    const nameElement = document.getElementById("name");
    nameElement.textContent = `You have selected: ${name}`; // Display name
    
    // Add the encircle class to the name for styling
    nameElement.classList.add('encircled'); 

    // Lock the shape and disable the ability to select again
    lockShapes(shapeId);
}

// Function to handle submission
function submitSelection() {
    if (selectedShapeId === null || hasSubmitted) return; // Prevent multiple submissions

    // Save the selected shape to local storage
    localStorage.setItem('selectedShape', selectedShapeId);
    displaySelection(selectedShapeId); // Show the selected name after submission
    hasSubmitted = true;

    // Disable the submit button after submission
    document.getElementById('submitBtn').disabled = true;
}

// Function to reset the app (only for host)
function resetApp()
{
 // Check if the user is the host
 const passwordInput = prompt("Enter password to reset app (only for host):");
 if (passwordInput === hostPassword) {
     localStorage.removeItem('selectedShape');
     location.reload(); // Reload the page to reset the app
 } else {
     alert("You are not authorized to reset the app.");
 }
}    