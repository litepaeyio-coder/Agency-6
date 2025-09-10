import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export const getAll = async (col) => {
  const snap = await getDocs(collection(db, col));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const addItem = async (col, data) => {
  const res = await addDoc(collection(db, col), data);
  return res.id;
};

export const updateItem = (col, id, data) =>
  updateDoc(doc(db, col, id), data);

export const deleteItem = (col, id) =>
  deleteDoc(doc(db, col, id));
