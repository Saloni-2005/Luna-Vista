document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

   
    

    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = document.getElementById("signupemail").value;
            const password = document.getElementById("signupPassword").value;
            const profileName = document.getElementById("profileName").value;

            if (localStorage.getItem(username)) {
                alert("Email already exists. Try a different one.");
            } else {
                const userData = { password: password, profileName: profileName , username:username};
                localStorage.setItem(username, JSON.stringify(userData));
                alert("Signup successful! You can now login.");
                window.location.href = "login.html"; 
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const username = document.getElementById("loginemail").value;
            const password = document.getElementById("loginPassword").value;

            const storedUser = JSON.parse(localStorage.getItem(username));

            if (storedUser && storedUser.password === password) {
                alert("Login successful!");
                window.location.href = "/saloni-2005/Luna-Vista/index.html"; 
            } else {
                alert("Invalid email or password.");
            }
        });
    }
});
