 
  var showUser = document.getElementById('showUser');
  let hideContent = document.getElementById('hide-container');
  let showContent =document.getElementById('show-container');
  let signInBtn = document.getElementById('loginBtn');
  let signOutBtn = document.getElementById('signoutBtn');


//     Login with goggle
function logInGoogle() {
		let providerG = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(providerG)
  .then(function(result) {
	if( firebase.auth().currentUser.providerData[0].displayName === null ) {
		 showUser.innerHTML=firebase.auth().currentUser.providerData[0].email;
		 
		 
	 } else {
		  showUser.innerHTML=firebase.auth().currentUser.providerData[0].displayName;
		  
	 }
	  
	let user = result.user;
	console.log(user);
	});
	}
//   logout function from quizzaro
function logOutUser() {
	firebase.auth().signOut()
    .then(function(result) {
  })
   .catch(function(error) {
	// Utloggning misslyckades
	console.log("something went wrong!")
  });
  }


  signInBtn.addEventListener('click', function(event) {
	  logInGoogle();
	  hideContent.style.visibility="visible";
      hideContent.style.opacity="1";
      showContent.style.visibility="hidden";
      showContent.style.opacity="0";
  })
  signOutBtn.addEventListener('click', function(event) {
	  logOutUser();
	  hideContent.style.visibility="hidden";
	  showContent.style.visibility="visible";
      showContent.style.opacity="1";
      hideContent.style.opacity="0";
  })