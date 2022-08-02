var developerMode = false;
document.getElementById("loginBtn").addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "/login";
});
document.getElementById("submitBtn").addEventListener("click", function (e) {
    e.preventDefault();
    post();
});


function post() {
    if(developerMode) console.log(document.getElementById("instSelection").value)
    var newPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            insitutionID: document.getElementById("instSelection").value,
            password: document.getElementById("password").value,
            passwordcnf: document.getElementById("password").value,
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value
        })
    }
    fetch("/Home/createAccount", newPost).then((response) => response.json()).then(function (data) {
        if(developerMode) console.log(data);
        window.location.href = "/";
    })
}
document.getElementById("registration").addEventListener("keyup", function () {
    if (document.getElementById("email").value.match(/([ ])/g)) {
        document.getElementById("emailconfirm").innerText = "";
        document.getElementById("emailWarning").innerText = "Invalid Email";
    } else {
        if (document.getElementById("email").value !== "") {
            fetch(`/home/emailCheck?email=${document.getElementById("email").value + iseDict.get(document.getElementById("instSelection").value) }`).then((response) => response.json()).then(function (data) {
                if(developerMode) console.log(data);
                if (data === 1) {
                    document.getElementById("emailconfirm").innerText = "";
                    document.getElementById("emailWarning").innerText = "Email already exists!";
                } else if(data === 0) {
                    document.getElementById("emailWarning").innerText = "";
                    document.getElementById("emailconfirm").innerText = "Email Available";
                }
            });
        }
    }
});