// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_IDjadFfYD9rofVbsRDP66x1Jh_gfXmM",
    authDomain: "seana-93b14.firebaseapp.com",
    databaseURL: "https://seana-93b14-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "seana-93b14",
    storageBucket: "seana-93b14.firebasestorage.app",
    messagingSenderId: "880418111638",
    appId: "1:880418111638:web:5fcdc8834d2f5490ea02b7",
    measurementId: "G-K5Q0GEXW9N"
};

// Initialize Firebase
// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const rtdb = firebase.database();

// Check if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User is signed in:', user);
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('register.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        // User is signed out
        console.log('User is signed out');
        if (window.location.pathname.includes('dashboard.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Perbaikan fungsi updateUserInfo
function updateUserInfo(user) {
    const db = firebase.firestore();
    
    // Get username and coins from Firestore
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
            } else {
                // If document doesn't exist, create it
                const userData = {
                    username: user.displayName || 'User',
                    email: user.email,
                    coins: 0,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                db.collection('users').doc(user.uid).set(userData);
            }
        })
        .catch((error) => {
            console.error("Error getting user data:", error);
        });
}

// Register Form Handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Create user with email and password
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            console.log('User registered:', user);

            // Create user document in Firestore
            await db.collection('users').doc(user.uid).set({
                username: username,
                email: email,
                coins: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Create user data in Realtime Database
            await rtdb.ref('users/' + user.uid).set({
                username: username,
                email: email,
                coins: 0
            });

            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Registration error:', error);
            showError(error.message);
        }
    });
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Login error:', error);
            showError(error.message);
        }
    });
}

// Perbaikan fungsi Google Sign In
async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        
        // Check if user exists in database
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        
        if (!userDoc.exists) {
            // Create new user document in Firestore
            await firebase.firestore().collection('users').doc(user.uid).set({
                username: user.displayName || 'User',
                email: user.email,
                coins: 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Create user data in Realtime Database
            await firebase.database().ref('users/' + user.uid).set({
                username: user.displayName || 'User',
                email: user.email,
                coins: 0
            });
        }

        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Google sign in error:', error);
        showError(error.message);
    }
}

// Auth state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('register.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        if (window.location.pathname.includes('dashboard.html') || 
            window.location.pathname.includes('wiki.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Error Handler
function showError(message) {
    const errorDiv = document.querySelector('.error-message') || createErrorDiv();
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
}

function createErrorDiv() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    const form = document.querySelector('form');
    form.insertBefore(errorDiv, form.firstChild);
    return errorDiv;
}

// Logout functionality
function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error signing out:', error);
    });
}

window.logout = logout;