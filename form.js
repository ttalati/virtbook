// Example starter JavaScript for disabling form submissions if there are invalid fields
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("works");
    } else {
        window.location.replace("index.html");
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
    var rEmail = document.getElementById("Email").value;
    var rName = document.getElementById("name").value;
    var message = document.getElementById("text").value;

    saveMessage(rName, message, senderEmail, senderName, rEmail);

    redirect();
}

function redirect()
{
    window.location.replace("success.html")
}

function saveMessage(rName, message, senderEmail, senderName, rEmail)
{
    var messagesRef = firebase.database().ref("messages/" + rName)
    var newMessagesRef = messagesRef.push();
    newMessagesRef.set({
        senderEmail: senderEmail,
        message: message,
        senderName: senderName,
        rEmail: rEmail
    })
}

