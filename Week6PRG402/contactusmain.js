
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import { getDatabase, set, get, ref, update, remove, push } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDPvo0db3lW7to4_tcJU0zoutFSQ-c3ckA",
    authDomain: "contactusform-9930c.firebaseapp.com",
    projectId: "contactusform-9930c",
    storageBucket: "contactusform-9930c.firebasestorage.app",
    messagingSenderId: "398747086721",
    appId: "1:398747086721:web:269d6d68581221b74e0280"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
    const db = getDatabase(app)
console.log(db)

let currentId = "";

function writeContact(name, email, address, phoneNumber, subject, comments){
    const newContactRef = push(ref(db,"contacts"));
    currentId = newContactRef.key;

    set(newContactRef,{
        contactId: currentId,
        name: name,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        subject: subject,
        comments: comments
    })
    .then(()=>{
        console.log("Data saved");
        showDetails(currentId);
    })
    .catch((error)=>{
        console.log(error);
    });
}

function showDetails(id){
    const contactRef = ref(db,"contacts/" + id);
    get(contactRef).then((snapshot)=>{

        if(snapshot.exists()){
            const data = snapshot.val();
            console.log("Data fetched");
            console.log(data);
            document.getElementById("details").innerHTML =
            "<b>Name:</b> " + data.name + "<br>" +
            "<b>Email:</b> " + data.email + "<br>" +
            "<b>Address:</b> " + data.address + "<br>" +
            "<b>Phone Number:</b> " + data.phoneNumber + "<br>" +
            "<b>Subject:</b> " + data.subject + "<br>" +
            "<b>Comments:</b> " + data.comments;
        }
    });
}

function fetchContactForEdit(){
    if(currentId == "") return;
    const contactRef = ref(db,"contacts/" + currentId);
    get(contactRef).then((snapshot)=>{

        if(snapshot.exists()){
            const data = snapshot.val();
            console.log("Data loaded for edit");
            console.log(data);
            document.getElementById("name").value = data.name;
            document.getElementById("email").value = data.email;
            document.getElementById("address").value = data.address;
            document.getElementById("phone").value = data.phoneNumber;
            document.getElementById("subject").value = data.subject;
            document.getElementById("comments").value = data.comments;

        }
    });
}

function updateContact(updatedData){
    if(currentId == "") return;
    const contactRef = ref(db,"contacts/" + currentId);
    update(contactRef, updatedData)
    .then(()=>{
        console.log("Updated successfully");
        showDetails(currentId);
    })
    .catch((error)=>{
        console.log(error);
    });
}

document.getElementById("submitBtn").addEventListener("click",()=>{
    writeContact(
        document.getElementById("name").value,
        document.getElementById("email").value,
        document.getElementById("address").value,
        document.getElementById("phone").value,
        document.getElementById("subject").value,
        document.getElementById("comments").value
    );
});

document.getElementById("editBtn").addEventListener("click",()=>{
    fetchContactForEdit();
});

document.getElementById("updateBtn").addEventListener("click",()=>{
    updateContact({
        name:document.getElementById("name").value,
        email:document.getElementById("email").value,
        address:document.getElementById("address").value,
        phoneNumber:document.getElementById("phone").value,
        subject:document.getElementById("subject").value,
        comments:document.getElementById("comments").value
    });
});
