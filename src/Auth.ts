import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from '@firebase/auth';
import app from '../../firebaseConfig';

const auth = getAuth(app);

/**
 * INDEX TABLE OF CONTENTS
 * 1. Enums
 * 2. User functions
 * 3. Password functions
 * 4. Email Functions
 * 5. Session Management Functions
 */

// =======================================
// 1. Enums
// =======================================

/**
 * @typedef {Object} MODES
 * @property {'login'} LOGIN - Represents the login page
 * @property {'register'} REGISTER - Represents the registration page
 * @property {'resetPassword'} RESET_PASSWORD - Represents the reset password page
 */

export const LOGIN_MODES = {
  LOGIN: 'login',
  REGISTER: 'register',
  RESET_PASSWORD: 'resetPassword',
};

// =======================================
// 2. User Functions
// =======================================

/** Register a user
 * @param {string} email users email
 * @param {string} password users password
 * @returns {object} User response object
 * @throws {Error} Throws an error if registration fails
 */

export const registerUser = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response.user;
  } catch (error) {
    throw error;
  }
};

/** Log in a user
 * @param {string} email users email
 * @param {string} password users password
 * @returns {object} User response object
 * @throws {Error} Throws an error if login fails
 */

export const loginUser = async (email, password) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response.user;
  } catch (error) {
    throw error;
  }
};

/** Get current user
 * @returns {object} User response object
 */

export const getCurrentUser = () => auth.currentUser;

// =======================================
// 3. Password Functions
// =======================================

/** Sends a password email to the provided email address
 * @param {string} email users email
 * @returns {undefined}
 * @throws {Error} Throws an error if sending reset password email fails
 */

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Reset Password sent to your Email');
  } catch (error) {
    console.error('Error sending reset password email', error);
    throw error;
  }
};

// =======================================
// 4. Email Functions
// =======================================

/** Sends verification email
 * @param {object} user Firebase user object
 * @returns {undefined}
 * @throws {Error} Throws an error if sending reset password email fails
 */

export const sendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user);
    console.log('Verification email sent.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// =======================================
// 5. Session Management Functions
// =======================================

/** Logs out the current user
 * @returns {undefined}
 * @throws {Error} Throws and error if logout fails
 */

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/** Subscribe to authentication state changes
 * @param {function} callback Callback function to handle auth state changes
 * @returns {function} Unsubscribe function
 */

export const observeAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};
