
// --------------------
// SCREEN NAVIGATION
// --------------------

function showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });

    document.getElementById(screenId).classList.add("active");

    if (screenId === "complaintsScreen") {
        renderComplaints();
    }

    if (screenId === "dashboardScreen") {
        renderDashboard();
    }

    if (screenId === "announcementsScreen") {
        renderAnnouncements();
    }
}

// --------------------
// LOGIN
// --------------------

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please enter username and password");
        return;
    }

    showScreen("dashboardScreen");
    renderDashboard();
}
function togglePassword(){

    const input =
        document.getElementById("password");

    if(input.type === "password"){
        input.type = "text";
    }else{
        input.type = "password";
    }

}
// --------------------
// STORAGE
// --------------------

function getComplaints() {
    return JSON.parse(localStorage.getItem("complaints")) || [];
}

function saveComplaints(data) {
    localStorage.setItem(
        "complaints",
        JSON.stringify(data)
    );
}

// --------------------
// SUBMIT COMPLAINT
// --------------------

function submitComplaint() {

    const title =
        document.getElementById("complaintTitle").value.trim();

    const location =
        document.getElementById("complaintLocation").value.trim();

    const category =
        document.getElementById("complaintCategory").value;

    const description =
        document.getElementById("complaintDescription").value.trim();

    if (
        !title ||
        !location ||
        !category ||
        !description
    ) {
        alert("Please fill all fields");
        return;
    }

    const complaints = getComplaints();

    const complaint = {
        id: "CMP-" + Date.now(),
        title,
        location,
        category,
        description,
        status: "Pending",
        date: new Date().toLocaleDateString()
    };

    complaints.unshift(complaint);

    saveComplaints(complaints);

    document.getElementById("complaintTitle").value = "";
    document.getElementById("complaintLocation").value = "";
    document.getElementById("complaintCategory").value = "";
    document.getElementById("complaintDescription").value = "";

    alert("Complaint submitted successfully!");

    renderDashboard();
    showScreen("complaintsScreen");
}

// --------------------
// DASHBOARD
// --------------------

function renderDashboard() {

    const complaints = getComplaints();

    document.getElementById(
        "totalComplaints"
    ).textContent = complaints.length;

    document.getElementById(
        "pendingComplaints"
    ).textContent = complaints.filter(
        c => c.status === "Pending"
    ).length;

    const recentContainer =
        document.getElementById("recentComplaints");

    recentContainer.innerHTML = "";

    if (complaints.length === 0) {

        recentContainer.innerHTML =
            "<p>No complaints yet.</p>";

        return;
    }

    complaints.slice(0, 3).forEach(c => {

        recentContainer.innerHTML += `
            <div class="complaint-card"
                 onclick="openComplaint('${c.id}')">

                <h4>${c.title}</h4>

                <p>${c.location}</p>

                <span class="status pending">
                    ${c.status}
                </span>

            </div>
        `;
    });
}

// --------------------
// COMPLAINT LIST
// --------------------

function renderComplaints() {

    const complaints = getComplaints();

    const search =
        document.getElementById("searchComplaint")
        ?.value
        .toLowerCase() || "";

    const container =
        document.getElementById("complaintsList");

    container.innerHTML = "";

    const filtered = complaints.filter(c =>
        c.title.toLowerCase().includes(search) ||
        c.location.toLowerCase().includes(search)
    );

    if (filtered.length === 0) {

        container.innerHTML =
            "<p>No complaints found.</p>";

        return;
    }

    filtered.forEach(c => {

        let statusClass = "pending";

        if (c.status === "Resolved") {
            statusClass = "resolved";
        }

        if (c.status === "In Progress") {
            statusClass = "progress";
        }

        container.innerHTML += `
            <div class="complaint-card"
                 onclick="openComplaint('${c.id}')">

                <h4>${c.title}</h4>

                <p>${c.location}</p>

                <p>${c.date}</p>

                <span class="status ${statusClass}">
                    ${c.status}
                </span>

            </div>
        `;
    });
}

// --------------------
// COMPLAINT DETAILS
// --------------------

function openComplaint(id) {

    const complaints = getComplaints();

    const complaint =
        complaints.find(c => c.id === id);

    if (!complaint) return;

    document.getElementById(
        "detailContainer"
    ).innerHTML = `

        <div class="detail-card">

            <h3>${complaint.title}</h3>

            <p>
                <strong>ID:</strong>
                ${complaint.id}
            </p>

            <p>
                <strong>Category:</strong>
                ${complaint.category}
            </p>

            <p>
                <strong>Location:</strong>
                ${complaint.location}
            </p>

            <p>
                <strong>Status:</strong>
                ${complaint.status}
            </p>

            <p>
                <strong>Date:</strong>
                ${complaint.date}
            </p>

            <p>
                <strong>Description:</strong><br>
                ${complaint.description}
            </p>

        </div>
    `;

    showScreen("detailScreen");
}

// --------------------
// ANNOUNCEMENTS
// --------------------

const announcements = [

    {
        title: "Road Maintenance",
        text: "Road repair work will begin next week."
    },

    {
        title: "Water Supply Notice",
        text: "Water supply may be interrupted on Sunday."
    },

    {
        title: "Community Meeting",
        text: "Residents meeting scheduled for Friday."
    },

    {
        title: "Waste Collection",
        text: "Waste collection timings updated."
    }

];

function renderAnnouncements() {

    const search =
        document.getElementById("announcementSearch")
        ?.value
        .toLowerCase() || "";

    const container =
        document.getElementById("announcementList");

    container.innerHTML = "";

    const filtered = announcements.filter(a =>
        a.title.toLowerCase().includes(search) ||
        a.text.toLowerCase().includes(search)
    );

    filtered.forEach(a => {

        container.innerHTML += `
            <div class="announcement-card">

                <h4>${a.title}</h4>

                <p>${a.text}</p>

            </div>
        `;
    });
}

// --------------------
// INITIAL LOAD
// --------------------

renderDashboard();
renderAnnouncements();