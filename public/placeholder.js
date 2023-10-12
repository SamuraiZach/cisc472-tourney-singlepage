var pages = ['page1', 'page2', 'page3'];
var currentPageIndex = -1;
console.log(currentPageIndex + " top of js");
var username = " "; //document.querySelector('.namereg'); same as user.displayName
var password = " ";
var email = " ";
var signtype = "";

console.log(currentPageIndex);
var showNextPage = function() {
    currentPageIndex = (currentPageIndex + 1) % pages.length;
    console.log("page index = ", currentPageIndex)
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here
    if (currentPageIndex == 2) {
        console.log("populate? full html means to use AJAX and pull stuff from DB about it");
    }
    display.innerHTML = template;
};
var showPreviousPage = function() {
    currentPageIndex = (currentPageIndex - 1) % pages.length;
    console.log("page index = ", currentPageIndex)
    var template = document.getElementById(pages[currentPageIndex]).innerHTML;
    //do stuff to template here

    display.innerHTML = template;

};
var google_provider = new firebase.auth.GoogleAuthProvider();
google_provider.setCustomParameters({ prompt: 'select_account' });
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
let renderLogin = () => {
    console.log("entered");
    console.log($("#logbutton")[0]);
    $("#logbutton").on("click", () => {
        firebase.auth().signInWithRedirect(google_provider);
        const tryF = firebase.auth().currentUser;
        console.log(tryF.displayName, " test");
        //showNextPage();
    });
    $("#registerbutton").on("click", () => {
        const modalReg = $("#modalReg")[0];
        //$("#fnameR").val("dadadadada"); //sets the value
        //const jj = $("#fnameR").val(); //will get the value
        //console.log(jj);
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
            firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
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
    $("#namereg").text(user.displayName);
    console.log("hi");
    console.log(user.displayName + ": udispo");
    $("#logoutbutton").on("click", () => {
        firebase.auth().signOut();
    });
    $("#createtourney").on("click", () => {
        const modalCreate = $("#modalCreate")[0];
        $("#tname").val("");
        $("#gname").val("");
        $("#nump").val("");
        $("#gpwd").val("");
        $("#pbox").val("");
        modalCreate.showModal();
        $("#closeCreate").click(() => {
            const tourneyName = $("#tname").val();
            const gamename = $("#gname").val();
            const numplayers = $("#nump").val();
            const gamepwd = $("#gpwd").val();
            const publicbox = $("#pbox").val();
            const ownersArry = [user];
            const ownerDisplayName = user.displayName;
            const ownerEmail = user.email;
            const playersArry = [];
            const matches = [];
            const joinableLink = ("https://cisc472-tourney.web.app/", tourneyName, "/", gamename, "/", ownerDisplayName);
            let obj = { //add more if needed for bracket tourney
                "TournamentName": tourneyName,
                "GameName": gamename,
                "NumPlayers": numplayers,
                "GamePassword": gamepwd,
                "PublicGame": publicbox,
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
            showNextPage();
        });

    });


};

showNextPage();