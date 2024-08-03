// script.js

const studentList = document.getElementById('studentList');
const studentNameInput = document.getElementById('studentName');
const pointsInput = document.getElementById('points');
const addButton = document.getElementById('addButton');

let students = {};

addButton.addEventListener('click', function() {
    const name = studentNameInput.value.trim();
    const points = parseInt(pointsInput.value, 10);

    if (name === '' || isNaN(points) || points <= 0) {
        alert('Please enter a valid student name and points.');
        return;
    }

    if (!students[name]) {
        students[name] = 0; // Initialize points if the student doesn't exist
    }

    students[name] += points; // Add points to the student
    updateStudentList();
    
    // Clear input fields
    studentNameInput.value = '';
    pointsInput.value = '';
});

function updateStudentList() {
    studentList.innerHTML = ''; // Clear the current list

    for (const [name, totalPoints] of Object.entries(students)) {
        const li = document.createElement('li');
        li.textContent = `${name}: ${totalPoints} points`;
        studentList.appendChild(li);
    }
}
