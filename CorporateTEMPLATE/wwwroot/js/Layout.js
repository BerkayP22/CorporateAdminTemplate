// Sidebar aç/kapa
document.getElementById("menuBtn").addEventListener("click", function () {
    document.getElementById("sidebar").classList.toggle("collapsed");
});

// Dark Mode
document.getElementById("darkModeBtn").addEventListener("click", function () {
    document.body.classList.toggle("dark");
});
// SIDEBAR TOGGLE
document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("sidebar").classList.toggle("collapsed");
});


// DROPDOWN (SIDEBAR MENUS)
document.querySelectorAll(".dropdown-toggle").forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();
        const parent = item.parentElement;
        parent.classList.toggle("active");
    });
});


// DARK MODE
document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});


// USER DROPDOWN
const userToggle = document.getElementById("userMenuToggle");
const userDropdown = document.getElementById("userDropdown");

userToggle.addEventListener("click", () => {
    userDropdown.style.display =
        userDropdown.style.display === "block" ? "none" : "block";
});

// Sayfada başka yere tıklayınca kapanması
document.addEventListener("click", (e) => {
    if (!userToggle.contains(e.target)) {
        userDropdown.style.display = "none";
    }
});

