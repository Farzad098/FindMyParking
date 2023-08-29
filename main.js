document.addEventListener("DOMContentLoaded", function () {
    const userContainer = document.getElementById("user-container");
    const authLinks = document.getElementById("auth-links");
    const userGreeting = document.getElementById("user-greeting");
    const usernameElement = document.getElementById("username");
    const logoutLink = document.getElementById("logout-link");

    if (logoutLink) {

        logoutLink.addEventListener("click", function () {
            sessionStorage.removeItem("userData");
            location.reload();
        });

        const storedUserData = sessionStorage.getItem("userData");
        const userData = JSON.parse(storedUserData);

        console.log(userData);
        if (userData && storedUserData !== undefined) {
            userContainer.style.display = "flex";
            usernameElement.textContent = userData.name; // Assuming the user data has a 'name' property
            authLinks.style.display = "none";
        } else {
            authLinks.style.display = "flex";
            userContainer.style.display = "none";
        }
    }
});
