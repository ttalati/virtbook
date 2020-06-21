
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //console.log("works");
        init();
    } else {
        window.location.replace("index.html");
    }
});


function init() {
    var user = firebase.auth().currentUser;
    //console.log(user.displayName);
    addFunction(user);
    checkDatabase(user);
}

function checkDatabase(user) {
    var messagesRef = firebase.database().ref("messages/" + user.displayName);
    messagesRef.once('value', gotData, errData);
}

function gotData(data) {
    //console.log(data.val());

    var user = firebase.auth().currentUser;
    var messages = data.val();
    if (messages != null) {
        var keys = Object.keys(messages);
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i];
            var sender = messages[k].senderName;
            var message = messages[k].message;
            var email = messages[k].rEmail;
            if (email == user.email) {
                buildPage(sender, message);
            }

        }
    }
    else {
        nothingToSeePage();
    }
}

function nothingToSeePage() {
    var element = document.getElementById("messageContent");

    var topDiv = document.createElement("div");
    topDiv.className = "alert alert-info";
    topDiv.role = "alert";
    var text = document.createTextNode("Looks like there is nothing to see yet. Invite some people to write or get started by writing yourself. Go to the Navigation Bar to start!")
    topDiv.appendChild(text);

    element.appendChild(topDiv);
}

function buildPage(sender, message) {
    var element = document.getElementById("messageContent");

    var topDiv = document.createElement("div");
    topDiv.className = "card my-5";

    var secondDiv = document.createElement("div");
    secondDiv.className = "card-header";
    var nameText = document.createTextNode("Sent By: " + sender);
    secondDiv.appendChild(nameText);

    var thirdDiv = document.createElement("div");
    thirdDiv.className = "card-body";

    var blockQuote = document.createElement("blockquote");
    blockQuote.className = "blockquote mb-0";

    var para = document.createElement("p");
    var messageText = document.createTextNode(message);
    para.appendChild(messageText);

    var foot = document.createElement("footer");
    foot.className = "blockquote-footer";
    foot.innerHTML = 'Kindly Sent By <cite title="Source Title">' + sender + '</cite>';



    element.appendChild(topDiv);
    topDiv.appendChild(secondDiv);
    topDiv.appendChild(thirdDiv);
    thirdDiv.appendChild(blockQuote);
    blockQuote.appendChild(para);
    blockQuote.appendChild(foot);

}

function errData(err) {
    console.log("Error!");
}

function addFunction(user) {
    var modify = document.getElementById("modify");
    var newText = "Welcome " + user.displayName + "!";
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