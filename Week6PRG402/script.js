
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
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
const app = initializeApp(firebaseConfig);
    const db = getDatabase(app)
console.log(db)

//Function to write user data to Firebase Realtime Database
// Get the database instance
// Create a reference/points to 'users/{userId}' and set the data (name and email)
function writeUserData(userId, firstname, lastname, age, gender, height, course, address, email, phone, interests) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    firstname: firstname,      
    lastname: lastname,
    age: age,
    gender: gender,
    height: height,
    course: course,
    address: address,
    email: email,
    phone: phone,
    skills: interests
  });
}
writeUserData(1, "Khushi", "Maharjan", 22, "Female", "182 cm", "BScIT", "Kathmandu", "khushhimaharjan@gmail.com", 9867929942, "AI/ML, Graphic Designing")
writeUserData(2, "Avipsha", "Shrestha", 20, "Female", "161 cm", "BScIT", "Kathmandu", "avipshashrestha@gmail.com", 9841234567, "Web Development, Cybersecurity");
writeUserData(3, "Signor", "Pandeya", 20, "Female", "161 cm", "BScIT", "Kathmandu", "signorpandeya@gmail.com", 9852345678, "Data Science, AI/ML");
writeUserData(4, "Preshika", "Thapa", 22, "Female", "171 cm", "BScIT", "Kathmandu", "preshikathapa@gmail.com", 9863456789, "Mobile App Development, UI/UX");
writeUserData(5, "Arpana", "Bista", 22, "Female", "162 cm", "BScIT", "Kathmandu", "arpanabista@gmail.com", 9844567890, "Digital Marketing, Graphic Designing");
writeUserData(6, "Bhichhu", "Prasai", 20, "Female", "168 cm", "BScIT", "Kathmandu", "bhichhuprasai@gmail.com", 9855678901, "Cloud Computing, Networking");
writeUserData(7, "Prija", "Sanjel", 22, "Female", "160 cm", "BScIT", "Kathmandu", "prijasanjel@gmail.com", 9866789012, "Software Engineering, Machine Learning");
writeUserData(8, "Ankita", "Gautam", 22, "Female", "159 cm", "BScIT", "Kathmandu", "ankitagautam@gmail.com", 9847890123, "Cybersecurity, Ethical Hacking");
writeUserData(9, "Nabin", "Poudel", 22, "Male", "176 cm", "BIT", "Kathmandu", "nabinpoudel@gmail.com", 9858901234, "UI/UX Design, Frontend Development");
writeUserData(10, "Bibek", "Basnet", 21, "Male", "177 cm", "BIM", "Kathmandu", "bibekbasnet@gmail.com", 9869012345, "Artificial Intelligence, Robotics");

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
readUser();

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
updateUserData(1, {firstname: "Sushi", lastname: "Maharjan"});
updateUserData(2, {firstname: "Avi", lastname: "Shrestha"});
updateUserData(3, {firstname: "Noor", lastname: "Pandeya"});

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
deleteUserData(10);

console.log("Added! Good")