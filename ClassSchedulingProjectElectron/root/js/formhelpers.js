function submitLoginDetails(e){
    var newPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        })
    }
    fetch(`${host}/Home/Login`, newPost).then((response) => response.json()).then(function (data) {
        console.log(data);
        localStorage.setItem("sessionID", data);
    })
}
function openRegistrationWindow(){

}