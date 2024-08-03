// script.js

const studentList = document.getElementById('studentList');
const studentNameInput = document.getElementById('studentName');
const pointsInput = document.getElementById('points');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
const feedbackMessage = document.createElement('div');
feedbackMessage.className = 'feedback';
document.body.appendChild(feedbackMessage);

let students = JSON.parse(localStorage.getItem('students')) || {};

function updateLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function displayFeedback(message) {
    feedbackMessage.textContent = message;
    setTimeout(() => {
        feedbackMessage.textContent = '';
    }, 3000);
}

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
    updateLocalStorage();
    updateStudentList();
    displayFeedback(`Added ${points} points to ${name}.`);

    // Clear input fields
    studentNameInput.value = '';
    pointsInput.value = '';
});

removeButton.addEventListener('click', function() {
    const name = studentNameInput.value.trim();
    const points = parseInt(pointsInput.value, 10);

    if (name === '' || isNaN(points) || points <= 0) {
        alert('Please enter a valid student name and points to remove.');
        return;
    }

    if (!students[name] || students[name] < points) {
        alert(`Cannot remove points. ${name} has only ${students[name] || 0} points.`);
        return;
    }

    students[name] -= points; // Remove points from the student
    updateLocalStorage();
    updateStudentList();
    displayFeedback(`Removed ${points} points from ${name}.`);

    // Clear input fields
    studentNameInput.value = '';
    pointsInput.value = '';
});

function updateStudentList() {
    studentList.innerHTML = ''; // Clear the current list

    for (const [name, totalPoints] of Object.entries(students)) {
        const li = document.createElement('li');
        li.className = 'student-item';
        
        const pointInfo = document.createElement('span');
        pointInfo.className = 'point-info';
        pointInfo.textContent = `${name}: ${totalPoints} points`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove Student';
        removeBtn.className = 'remove-button';
        removeBtn.addEventListener('click', () => {
            delete students[name];
            updateLocalStorage();
            updateStudentList();
            displayFeedback(`${name} removed from the list.`);
        });

        li.appendChild(pointInfo);
        li.appendChild(removeBtn);
        studentList.appendChild(li);
    }
}

// Initial load of student list from local storage
updateStudentList();
