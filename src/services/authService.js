import { auth } from './firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const signOutUser = () => signOut(auth);
