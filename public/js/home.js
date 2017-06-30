app = {}
var provider = new firebase.auth.GoogleAuthProvider();
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
(function () {
	firebase.auth().onAuthStateChanged(function(user) {
  		if (user) {
  			name = user.displayName;
  			email = user.email;
  			photoUrl = user.photoURL;
  			emailVerified = user.emailVerified;
  			uid = user.uid;
  			var welcome = "Welcome " + name + "!";
  			document.getElementById('login').innerHTML = welcome;
  		} 
	});
})();

 function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }

function signIn(){
	firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
}).catch(function(error) {
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