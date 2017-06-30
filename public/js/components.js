var dialog = document.querySelector('dialog');
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
  			getAppObject(0);
  		} else {
    		dialog.showModal();
 	 	}
	});
})();
dialog.querySelector('.close').addEventListener('click', function() {
   	dialog.close();
   	window.location.replace('/');
});

function signOut(){
	firebase.auth().signOut();
}
//Get 1st app object
function getAppObject(id){
	var ref = firebase.database().ref('users/' + uid).child('page');
	if (id == 0){
		ref.once('value', function(snap) {
			console.log(snap.val());
			if(snap.val()){
				setLoadData(snap.val());
  	 		}
		});
	}
}

function setLoadData(data) {
    for (var k in data) {
        if (data.hasOwnProperty(k)) {
        	if(k == 'app--logo'){
        		 document.getElementsByClassName(k)[0].src = data[k];
        	} else {
        		document.getElementsByClassName(k)[0].innerHTML = data[k];
        		document.getElementById(k).value = data[k];
        	}
        }
    }
}

//Update app object
function updateInput(element, val, type){
	var ref = firebase.database().ref('users/' + uid).child('page');
	app[element] = val;
	ref.set(app);
	console.log(element);
	if(type == "img"){
		document.getElementsByClassName(element)[0].src = val;
	} else {
		document.getElementsByClassName(element)[0].innerHTML = val;
	}
}

//Image uploader
document.getElementById("app--logo").addEventListener("click", function() {
    cloudinary.openUploadWidget({ cloud_name: 'developfintech', upload_preset: 'a6xmi7rz'}, 
      	function(error, result) { 
      	console.log(result[0].secure_url);
      	updateInput("app--logo", result[0].secure_url, 'img');
      });
}, false);

