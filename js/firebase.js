/********Firebase*********/
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC1E-J6jn6HtV4aqYS3qlHIRSAY3wdM4ZI",
  authDomain: "ecommerce-two.firebaseapp.com",
  databaseURL: "https://ecommerce-two.firebaseio.com",
  projectId: "ecommerce-two",
  storageBucket: "ecommerce-two.appspot.com",
  messagingSenderId: "1022431917306"
};

firebase.initializeApp(config);

      /******Login*******/
var provider = new firebase.auth.GoogleAuthProvider();

$('#log-in').click(function(e){
  e.preventDefault();
  firebase.auth()
  .signInWithPopup(provider)
  .then(function(result) {
    console.log(result.user);
    $('#log-in').hide();
    $('#profile-photo').append("<img class='image-profile' src='"+ result.user.photoURL +"'/>");
    console.log("<img src='"+ result.user.photoURL +"'/>");
    $("#username").text(result.user.displayName);
    console.log(result.user.displayName);
    $('#email').text(result.user.email)
    $(".log-out").removeClass("hide");
    $(".log-out").addClass("show");
  });
});
