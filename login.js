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
	});
	}
//   logout function from quizzaro
function logOutUser() {
	firebase.auth().signOut()
    .then(function(result) {
	console.log("signed out!")
	secBtn.disabled=true;
  })
   .catch(function(error) {
	// Utloggning misslyckades
	console.log("something went wrong!")
  });
  }

  let showUser = document.getElementById('showUser');
  let hideContent = document.getElementById('hide-container');
  let showContent =document.getElementById('show-container');
  let signInBtn = document.getElementById('loginBtn');
  let signOutBtn = document.getElementById('signoutBtn');

  signInBtn.addEventListener('click', function(event) {
	  logInGoogle();
	  hideContent.style.display="block";
      showContent.style.display="none";
  })
  signOutBtn.addEventListener('click', function(event) {
	  logOutUser();
	  signOutBtn.style.display="none";
	  signInBtn.style.display="block";
    
  })