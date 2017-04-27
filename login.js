//     Login with goggle
function logInGoogle() {
		let providerG = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(providerG)
  .then(function(result) {
	if( firebase.auth().currentUser.providerData[0].displayName === null ) {
		 showUser.innerHTML=firebase.auth().currentUser.providerData[0].email;
		 secBtn.disabled=false;
		 
	 } else {
		  showUser.innerHTML=firebase.auth().currentUser.providerData[0].displayName;
		  secBtn.disabled=false;
	 }
	  
	let user = result.user;
	console.log(user);
	showImg.src=firebase.auth().currentUser.providerData[0].photoURL;
	});
	}
//   logout function from quizzaro
function logOutUser() {
	firebase.auth().signOut()
    .then(function(result) {
	console.log("signed out!")
	secBtn.disabled=true;
	secImg.src="";
  })
   .catch(function(error) {
	// Utloggning misslyckades
	console.log("something went wrong!")
  });
  }

  let hideContent = document.getElementById('hide-container');
  let showContent =document.getElementById('show-container');
  let signInBtn = document.getElementById('loginBtn');
  let signOutBtn = document.getElementById('signoutBtn');

  signInBtn.addEventListener('click', function(event) {
	  logInGoogle();
	  hideContent.style.visibility="visible";
      showContent.style.visibility="hidden";
  })
  signOutBtn.addEventListener('click', function(event) {
	  logOutUser();
	  signOutBtn.style.visibility="hidden";
	  signInBtn.style.visibility="visible";
    
  })