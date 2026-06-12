// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, set, get, ref, update, remove, push } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
// initializeApp – to initialize your Firebase app.
// getDatabase – to get a reference to the Firebase Realtime Database.
// set – to write data to the database.
// get – to read data from the database.
// ref – to create references (paths) in the database.

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyD8aLuz4qPOW0fnZcH6IASjI1JuNZHTFME",
    authDomain: "mobile-programming-e16f5.firebaseapp.com",
    projectId: "mobile-programming-e16f5",
    storageBucket: "mobile-programming-e16f5.firebasestorage.app",
    messagingSenderId: "45857506014",
    appId: "1:45857506014:web:99225e87c6ad745af0784f"
  };

// Initialize Firebase
// initializeApp(firebaseConfig) initializes your Firebase application using the config.
// getDatabase(app) gets the Realtime Database instance connected to your Firebase project.
const app = initializeApp(firebaseConfig);
    const db = getDatabase(app)
console.log(db)

// Function to write user data to Firebase Realtime Database
// Function to write user data with unique ID
function writeUserData(userId, name, age, gender, height, course, address, email, phone, skills, interests) {
  // Create a reference to 'users' collection
  const usersRef = ref(db, 'users/' + userId);

  // push() generates a unique key for the new child
  //const newUserRef = push(usersRef);

  // set() stores the data at that unique location
  set(usersRef, {
    name: name,
    age: age,
    gender: gender,
    height: height,
    course: course,
    address: address,
    email: email,
    phone: phone,
    skills: skills,
    interests: interests
  })
  .then(() => {
    console.log("User added successfully with ID:", userId);
  })
  .catch((error) => {
    console.error("Error adding user:", error);
  });
}

// Expose the function to the global scope so it can be accessed from HTML (e.g., via button click)
window.writeUserData = writeUserData;

// ref(db, 'users') points to the users path.
// get(userRef) gets the data at that path.
// snapshot.forEach(...) loops over each child node (each user).
// childsnapshot.val() gives the actual data (name and email), which is printed.
function readUser(){
    const userRef = ref(db,'users')
    get(userRef).then((snapshot)=>{
        snapshot.forEach((childsnapshot)=>{
            console.log(childsnapshot.val());
        })
    })
}
//readUser()
window.readUser = readUser;

// Read a single user by ID and show the result on the page.
function readUserById(userId) {
  const userRef = ref(db, 'users/' + userId);
  get(userRef).then((snapshot) => {
    const user = snapshot.val();
    console.log("User found:", user);
    document.getElementById('read-result').textContent =
      "Name: " + user.name +  " | " + "Age: " + user.age + " | " + "Gender: " + user.gender + " | " + "Height: " + user.height + " | " + "Course: " + user.course + " | " + "Address: " + user.address + " | " + "Email: " + user.email + " | " + "Phone: " + user.email +  " | " + "Interests: " + user.interests + "| " + "Skills: " + user.skills;
  });
}
window.readUserById = readUserById;

// Fetch an existing user by ID and load their data into the update input fields,
// so the values can be edited and then saved with updateUserData().
function fetchUserForUpdate(userId) {
  const userRef = ref(db, 'users/' + userId);
  get(userRef).then((snapshot) => {
    const user = snapshot.val();
    document.getElementById('update-name').value = user.name;
    document.getElementById('update-age').value = user.age;
    document.getElementById('update-gender').value = user.gender;
    document.getElementById('update-height').value = user.height;
    document.getElementById('update-course').value = user.course;
    document.getElementById('update-address').value = user.address;
    document.getElementById('update-email').value = user.email;
    document.getElementById('update-phone').value = user.phone;
    document.getElementById('update-interests').value = user.interests;
    document.getElementById('update-skills').value = user.skills;
    console.log("Loaded user into form:", user);
  });
}
window.fetchUserForUpdate = fetchUserForUpdate;

function updateUserData(userId, updatedData) {
  const userRef = ref(db, 'users/' + userId);
  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}

// Example usage:
//updateUserData();
window.updateUserData = updateUserData;

function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// Example usage:
//deleteUserData(2);
window.deleteUserData = deleteUserData;