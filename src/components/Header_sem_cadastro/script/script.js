const loginModal = document.getElementById("loginModal");
const cadastroModal = document.getElementById("cadastroModal");
const loginButton = document.querySelector(".auth .button:first-child");
const cadastreButton = document.querySelector(".auth .button:last-child");
const closeButtons = document.querySelectorAll(".close");

loginButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    loginModal.style.display = "block";
});

cadastreButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    cadastroModal.style.display = "block";
});

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        loginModal.style.display = "none";
        cadastroModal.style.display = "none";
    });
});

window.addEventListener("click", (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
    if (event.target === cadastroModal) {
        cadastroModal.style.display = "none";
    }
});