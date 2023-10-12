//create pushes table 
var pages = ['page1', 'page2', 'page3'];
var currentPageIndex = -1;
console.log(currentPageIndex + " top of js");
var username = " "; //document.querySelector('.namereg'); same as user.displayName
var password = " ";
var email = " ";
var signtype = "";
let loggedInPerson = false;
console.log(currentPageIndex);
var showNextPage = function() {
    currentPageIndex = (currentPageIndex + 1) % pages.length;
    console.log("page index = ", currentPageIndex)
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here
    display.innerHTML = template;
    if (currentPageIndex == 2) {
        renderTournament();
        console.log("populate? full html means to use AJAX and pull stuff from DB about it");
    }
};
var showPreviousPage = function() {
    currentPageIndex = (currentPageIndex - 1) % pages.length;
    console.log("page index = ", currentPageIndex)
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here

    display.innerHTML = template;

};

/*
firebase.auth().onAuthStateChanged(user => {
    if (!!user) {
        //currentPageIndex = 0;
        console.log(signtype, ": sty ", username, " : uname");
        if (signtype === "free" && user.displayName == null) {
            console.log("enter HERE!");
            user.updateProfile({ displayName: username.toString() }).then(function() {
                    console.log(user.displayName, " inside 1");
                })
                .catch(function(error) {
                    console.log("error");
                });
            console.log(user.displayName, " after catch");
        } else {
            username = user.displayName;
        }
        showNextPage();
        console.log(user + " : after sign in") ///////////////////////////////////////////////////////////////////
        console.log("after login");
        startApp(user);
    } else {
        if (currentPageIndex == 1) {
            showPreviousPage();
        }
        console.log(user + " : initial null user") //////////////////////////////////////////////////////////////
        console.log("First AUTH");
        renderLogin();
    }
});
*/
/*let renderTournament = () => {

};*/
let renderLogin = () => {
    console.log("entered");
    console.log($("#logbutton")[0]);
    $("#logbutton").on("click", () => {
        firebase.auth().signInWithRedirect(google_provider);
        //const tryF = firebase.auth().currentUser;
        //console.log(tryF.displayName, " test");
        //showNextPage();
    });
    $("#registerbutton").on("click", () => {
        const modalReg = $("#modalReg")[0];
        $("#fnameR").val("");
        $("#pwdR").val("");
        $("#email").val("");
        modalReg.showModal();
        $("#closeReg").click(() => {
            console.log("reach");
            const modalReg = $("#modalReg")[0];
            username = $("#fnameR").val();
            password = $("#pwdR").val();
            email = $("#email").val();;
            let obj = {
                "Username": username,
                "Password": password,
                "Email": email
            };
            modalReg.close();
            firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredentials) => {
                var pp = userCredentials.user;
                console.log(pp.displayName, " dd");
                user.updateProfile({ displayName: username.toString() }).then(function() {
                        console.log(user.displayName, " inside 2");
                    })
                    .catch(function(error) {
                        console.log("error");
                    });
                console.log(user.displayName, " after catch");

            });
            console.log("teehee");
            signtype = "free";
            console.log(signtype);
        });
    });

};
let startApp = (user) => {
    console.log(user.email + ": startApp Email");
    if (signtype === "free" && user.displayName == null) {
        user.updateProfile({ displayName: username });
    }
    console.log("hi");
    console.log(user.displayName + ": udispo");
    console.log(username + ": uddddd");
    $("#namereg").text(username);
    $("#logoutbutton").on("click", () => {
        firebase.auth().signOut();
    });
    $("#createtourney").on("click", () => {
        const modalCreate = $("#modalCreate")[0];
        $("#tname").val("");
        $("#gname").val("");
        $("#nump").val("");
        $("#gpwd").val("");
        modalCreate.showModal();
        $("#closeCreate").click(() => {
            const tourneyName = $("#tname").val();
            const gamename = $("#gname").val();
            const numplayers = $("#nump").val();
            const gamepwd = $("#gpwd").val();
            const ownersArry = [user];
            const ownerDisplayName = user.displayName;
            const ownerEmail = user.email;
            const playersArry = [];
            const matches = [];
            const joinableLink = ("https://cisc472-tourney.web.app/", "Tournament/"); // ,tourneyName, "/", gamename, "/", ownerDisplayName);
            let obj = { //add more if needed for bracket tourney
                "TournamentName": tourneyName,
                "GameName": gamename,
                "NumPlayers": numplayers,
                "GamePassword": gamepwd,
                "Owners": ownersArry,
                "Players": playersArry,
                "Games": matches,
                "OwnerEmail": ownerEmail,
                "OwnerName": ownerDisplayName,
                "JoinableLink": joinableLink
            };
            //then ajax stuff into game on firebase
            const modalCreate = $("#modalCreate")[0];
            modalCreate.close();
            //showNextPage();
        });
        //console.log("redering");
        //firebase.database().ref("/surveys").on("value", ss => {});

    });
    console.log("redering");


};
let routeToPage = (parts, user) => {
    //addLogout();
    console.log(parts.length);
    if (parts.length < 3) {
        showNextPage();
        startApp(user);
    } else {
        if (parts[1] == "tournament" && parts[2].length > 1) {
            //renderSurvey(parts[2]);
            console.log("teehee");
        } else {
            alert("Tournament Doesnt Exist / Invalid Link");
            showNextPage();
            startApp(user);
        }
    }
}
var google_provider = new firebase.auth.GoogleAuthProvider();
google_provider.setCustomParameters({ prompt: 'select_account' });
document.addEventListener('DOMContentLoaded', function() {
    let pn = document.location.pathname;
    let URLparts = pn.split("/");

    firebase.auth().onAuthStateChanged(user => {
        if (!!user) {
            //currentPageIndex = 0;
            loggedInPerson = user;
            console.log(signtype, ": sty ", username, " : uname");
            if (signtype === "free" && user.displayName == null) {
                console.log("enter HERE!");
                user.updateProfile({ displayName: username.toString() }).then(function() {
                        console.log(user.displayName, " inside 1");
                    })
                    .catch(function(error) {
                        console.log("error");
                    });
                console.log(user.displayName, " after catch");
            } else {
                username = user.displayName;
            }
            //showNextPage();
            console.log(user + " : after sign in") ///////////////////////////////////////////////////////////////////
            console.log("after login");
            routeToPage(URLparts, user);
            //startApp(user);
        } else {
            if (currentPageIndex == 1) {
                showPreviousPage();
            }
            loggedInPerson = false;
            console.log(user + " : initial null user") //////////////////////////////////////////////////////////////
            console.log("First AUTH");
            renderLogin();
        }
    });
    //Expecting /tourney/:uidhere
    /*
    firebase.auth().onAuthStateChanged(user => {
      if (!!user){
        loggedInPerson = user;
        routeToPage(URLparts);
      } else {
        loggedInPerson = false;
        $("#logout-wrap").remove();
        renderLogin();
      }
    });*/
    console.log("SPLIT!");
});
showNextPage();