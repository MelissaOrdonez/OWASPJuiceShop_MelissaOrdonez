const inputEmail = document.getElementById("email");
const submitButton = document.getElementById("submit");
const inputPassword = document.getElementById("password");
const result = document.getElementById("result");

function checkEmail(email){
    if(email.length < 8) return false;
    if(!email.includes('@')) return false;
    return true;
}

submitButton.addEventListener('click', async function(){
    const emailValue = inputEmail.value;
    const passwordValue = inputPassword.value;

    if(checkEmail(emailValue) == false){
        result.textContent = "Invalid Email Address";
        return;
    }
    else if(passwordValue == ""){
        result.textContent = "Invalid Password";
        return;
    }

    const response = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailValue,
            password: passwordValue
        })
    });

    const data = await response.json();
    if (data.role === "admin") {
        result.textContent = "Welcome Admin!";
    } else if (data.role === "user") {
        result.textContent = "Welcome User!";
    } else {
        result.textContent = "Invalid User";
    }
})