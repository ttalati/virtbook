// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyAwS-N5-nXqDBEWgZmOR-xdpw7JqA633Fg",
    authDomain: "virtbook-d4058.firebaseapp.com",
    databaseURL: "https://virtbook-d4058.firebaseio.com",
    projectId: "virtbook-d4058",
    storageBucket: "virtbook-d4058.appspot.com",
    messagingSenderId: "206125144618",
    appId: "1:206125144618:web:b0ae9c12cbfaf7a53b8153",
    measurementId: "G-NTJNZTZ3SM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.getElementById("work").addEventListener("click", signInFunction);

function signOut() {
    firebase.auth().signOut().then(function () {
        console.log("nice");
        window.location.replace("index.html");
        // Sign-out successful.

    }).catch(function (error) {
        // An error happened.
    });
}

function loadPage() {

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}
function signInFunction()
{
    loadPage();
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.location.replace("mainpage.html");
    }
});


