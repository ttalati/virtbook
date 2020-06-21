// Example starter JavaScript for disabling form submissions if there are invalid fields
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("works");
    } else {
        window.location.replace("index.html");
        alert("Please Sign In First!")
    }
});



document.getElementById("submitform").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    var user = firebase.auth().currentUser;

    console.log(123);
    console.log(user.email);
    var senderEmail = user.email;
    var senderName = user.displayName;
    var message = document.getElementById("text").value;

    saveMessage(message, senderEmail, senderName);

    redirect();
}

function redirect()
{
    window.location.replace("success.html")
}

function saveMessage(message, senderEmail, senderName)
{
    var messagesRef = firebase.database().ref("devMessage")
    var newMessagesRef = messagesRef.push();
    newMessagesRef.set({
        senderEmail: senderEmail,
        message: message,
        senderName: senderName,
    })
}

