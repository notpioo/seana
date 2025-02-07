// Avatar options - you can add more or modify these
const avatars = [
    { icon: 'user' },
    { icon: 'smile' },
    { icon: 'ghost' },
    { icon: 'cat' },
    { icon: 'dog' },
    { icon: 'dragon' },
    { icon: 'fish' },
    { icon: 'robot' }
];

let currentUser = null;
let selectedAvatar = null;

// Initialize the avatar grid
function initializeAvatarGrid() {
    const avatarGrid = document.getElementById('avatarGrid');
    
    avatars.forEach((avatar, index) => {
        const avatarOption = document.createElement('div');
        avatarOption.className = 'avatar-option';
        avatarOption.innerHTML = `<i class="fas fa-${avatar.icon}"></i>`;
        
        avatarOption.addEventListener('click', () => selectAvatar(index));
        avatarGrid.appendChild(avatarOption);
    });
}

// Select avatar function
function selectAvatar(index) {
    const allAvatars = document.querySelectorAll('.avatar-option');
    allAvatars.forEach(avatar => avatar.classList.remove('selected'));
    
    const selectedOption = allAvatars[index];
    selectedOption.classList.add('selected');
    
    selectedAvatar = avatars[index];
    
    // Update preview
    const currentAvatarPreview = document.getElementById('currentAvatar');
    currentAvatarPreview.innerHTML = `<i class="fas fa-${selectedAvatar.icon}"></i>`;
}

// Load user profile
function loadUserProfile() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            const db = firebase.firestore();
            
            db.collection('users').doc(user.uid).get()
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        
                        // Set current username
                        const usernameInput = document.getElementById('usernameInput');
                        const currentUsername = document.getElementById('currentUsername');
                        
                        usernameInput.value = data.username || '';
                        currentUsername.textContent = data.username || 'User';
                        
                        // Set current avatar if exists
                        if (data.avatar) {
                            const avatarIndex = avatars.findIndex(a => a.icon === data.avatar);
                            if (avatarIndex !== -1) {
                                selectAvatar(avatarIndex);
                            }
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error loading user profile:", error);
                });
        } else {
            window.location.href = 'login.html';
        }
    });
}

// Save profile changes
async function saveProfile() {
    if (!currentUser) return;
    
    const newUsername = document.getElementById('usernameInput').value.trim();
    if (!newUsername) {
        alert('Please enter a username');
        return;
    }
    
    const avatar = selectedAvatar ? selectedAvatar.icon : 'user';
    
    try {
        const db = firebase.firestore();
        const rtdb = firebase.database();
        
        const userData = {
            username: newUsername,
            avatar: avatar,
            lastUpdated: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Update or create document in Firestore
        await db.collection('users').doc(currentUser.uid).set(userData, { merge: true });
        
        // Update or create in Realtime Database
        await rtdb.ref('users/' + currentUser.uid).update({
            username: newUsername,
            avatar: avatar,
            lastUpdated: firebase.database.ServerValue.TIMESTAMP
        });
        
        // Success notification
        alert('Profile updated successfully!');
        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error("Error updating profile:", error);
        // More specific error message
        if (error.code === 'permission-denied') {
            alert('Permission denied. Please sign in again.');
        } else {
            alert('Error updating profile: ' + error.message);
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeAvatarGrid();
    loadUserProfile();
    
    const saveButton = document.getElementById('saveProfileButton');
    saveButton.addEventListener('click', saveProfile);
    
    const usernameInput = document.getElementById('usernameInput');
    usernameInput.addEventListener('input', (e) => {
        const currentUsername = document.getElementById('currentUsername');
        currentUsername.textContent = e.target.value || 'User';
    });
});