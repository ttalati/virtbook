
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("works");
        init();
    } else {
        window.location.replace("index.html");
    }
});


function init() {
    var user = firebase.auth().currentUser;
    console.log(user.displayName);
    addFunction(user);
}

function addFunction(user)
{
    var modify = document.getElementById("modify");
    var newText = "Welcome " + user.displayName +"!";
    modify.textContent = newText;
}

function signOut() {
    firebase.auth().signOut().then(function () {
        console.log("nice");
        window.location.replace("index.html");
        // Sign-out successful.

    }).catch(function (error) {
        // An error happened.
    });
}