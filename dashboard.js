// Listen for auth state changes
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        const db = firebase.firestore();
        
        // Get username, coins and avatar from Firestore
        db.collection('users').doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    
                    // Update profile name
                    const profileName = document.querySelector('.profile-name');
                    if (profileName) {
                        profileName.textContent = data.username || user.displayName || 'User';
                    }
                    
                    // Update coins display
                    const coinsDisplay = document.querySelector('.coins span');
                    if (coinsDisplay) {
                        coinsDisplay.textContent = (data.coins || 0).toLocaleString();
                    }

                    // Update avatar
                    const profilePic = document.querySelector('.profile-pic');
                    if (profilePic) {
                        profilePic.innerHTML = `<i class="fas fa-${data.avatar || 'user'}"></i>`;
                    }
                }
            })
            .catch((error) => {
                console.error("Error getting user data:", error);
            });
    } else {
        // User is signed out, redirect to login
        window.location.href = 'login.html';
    }
});

// Update user info function
function updateUserInfo(user) {
    const db = firebase.firestore();
    
    // Get username, coins and avatar from Firestore
    db.collection('users').doc(user.uid).get()
        .then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                
                // Update profile name
                const profileName = document.querySelector('.profile-name');
                if (profileName) {
                    profileName.textContent = data.username || user.displayName || 'User';
                }
                
                // Update coins display
                const coinsDisplay = document.querySelector('.coins span');
                if (coinsDisplay) {
                    coinsDisplay.textContent = (data.coins || 0).toLocaleString();
                }

                // Update avatar
                const profilePic = document.querySelector('.profile-pic');
                if (profilePic) {
                    profilePic.innerHTML = `<i class="fas fa-${data.avatar || 'user'}"></i>`;
                }
            }
        })
        .catch((error) => {
            console.error("Error getting user data:", error);
        });
}

// Make logout function globally available
window.logout = function() {
    firebase.auth().signOut()
        .then(() => {
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
};