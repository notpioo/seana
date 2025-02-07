// Avatar options - expanded list
const avatars = [
    { icon: 'user', category: 'People' },
    { icon: 'smile', category: 'People' },
    { icon: 'user-ninja', category: 'People' },
    { icon: 'user-astronaut', category: 'People' },
    { icon: 'user-secret', category: 'People' },
    { icon: 'ghost', category: 'Creatures' },
    { icon: 'cat', category: 'Animals' },
    { icon: 'dog', category: 'Animals' },
    { icon: 'dragon', category: 'Creatures' },
    { icon: 'fish', category: 'Animals' },
    { icon: 'robot', category: 'Technology' },
    { icon: 'spider', category: 'Animals' },
    { icon: 'dove', category: 'Animals' },
    { icon: 'hippo', category: 'Animals' },
    { icon: 'otter', category: 'Animals' },
    { icon: 'kiwi-bird', category: 'Animals' },
    { icon: 'alien', category: 'Creatures' },
    { icon: 'android', category: 'Technology' },
    { icon: 'space-shuttle', category: 'Technology' },
    { icon: 'rocket', category: 'Technology' }
];

let currentUser = null;
let selectedAvatar = null;

// Initialize the avatar grid with categories
function initializeAvatarGrid() {
    const avatarGrid = document.getElementById('avatarGrid');
    
    // Group avatars by category
    const categories = {};
    avatars.forEach(avatar => {
        if (!categories[avatar.category]) {
            categories[avatar.category] = [];
        }
        categories[avatar.category].push(avatar);
    });

    // Create category sections
    Object.entries(categories).forEach(([category, categoryAvatars]) => {
        // Add category title
        const categoryTitle = document.createElement('h4');
        categoryTitle.className = 'avatar-category-title';
        categoryTitle.textContent = category;
        avatarGrid.appendChild(categoryTitle);

        // Create grid for this category
        const categoryGrid = document.createElement('div');
        categoryGrid.className = 'avatar-category-grid';
        
        categoryAvatars.forEach((avatar, index) => {
            const avatarOption = document.createElement('div');
            avatarOption.className = 'avatar-option';
            avatarOption.innerHTML = `
                <i class="fas fa-${avatar.icon}"></i>
                <span class="avatar-name">${avatar.icon.replace(/-/g, ' ')}</span>
            `;
            
            avatarOption.addEventListener('click', () => {
                selectAvatar(avatar);
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                avatarOption.appendChild(ripple);
                setTimeout(() => ripple.remove(), 1000);
            });
            
            categoryGrid.appendChild(avatarOption);
        });

        avatarGrid.appendChild(categoryGrid);
    });
}

// Select avatar function
function selectAvatar(avatar) {
    const allAvatars = document.querySelectorAll('.avatar-option');
    allAvatars.forEach(av => av.classList.remove('selected'));
    
    // Find and select the clicked avatar
    allAvatars.forEach(av => {
        if (av.querySelector(`fa-${avatar.icon}`)) {
            av.classList.add('selected');
        }
    });
    
    selectedAvatar = avatar;
    
    // Update preview with animation
    const currentAvatarPreview = document.getElementById('currentAvatar');
    currentAvatarPreview.classList.add('avatar-update');
    currentAvatarPreview.innerHTML = `<i class="fas fa-${avatar.icon}"></i>`;
    setTimeout(() => currentAvatarPreview.classList.remove('avatar-update'), 300);
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
                            const avatarObj = avatars.find(a => a.icon === data.avatar);
                            if (avatarObj) {
                                selectAvatar(avatarObj);
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
        const saveButton = document.getElementById('saveProfileButton');
        saveButton.disabled = true;
        saveButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        
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
        
        // Success notification and redirect
        saveButton.innerHTML = '<i class="fas fa-check"></i> Saved!';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        console.error("Error updating profile:", error);
        const saveButton = document.getElementById('saveProfileButton');
        saveButton.disabled = false;
        saveButton.innerHTML = 'Save Changes';
        
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