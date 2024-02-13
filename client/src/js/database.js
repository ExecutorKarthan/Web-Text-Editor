import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try{
    console.log('PUT to the database');
    const textDb = await openDB('jate', 1);
    const editTx = textDb.transaction('jate', 'readwrite');
    const store = editTx.objectStore('jate');
    const request = store.add({ jate: content });
    const result = await request;
    console.log('Data saved to the database', result);
    return result;
  }
  catch{
    console.error('putDb failed.');
  }
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try{
    console.log('GET all from the database');
    const textdbDb = await openDB('jate', 1);
    const allTx = textdbDb.transaction('jate', 'readonly');
    const store = allTx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('The following values were found:', result);
    return result;
  }
  catch{
    console.error('getDb failed');
  }
}

initdb();
