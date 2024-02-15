//Import the database module
import { openDB } from 'idb';

//Open a connection to the local database
const initdb = async () =>
  openDB('jate', 1, {
    //Test to see if the database exists - if it does log it and move one
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //If the database does not exist, create it
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Create a function to save text to the database
export const putDb = async (content) => {
  try{
    console.log('PUT to the database');
    //Open the database and set the permissions to edit the database
    const textDb = await openDB('jate', 1);
    const editTx = textDb.transaction('jate', 'readwrite');
    const store = editTx.objectStore('jate');
    //Update the database with the content
    const request = store.put({jate: content });
    const result = await request;
    console.log('Data saved to the database', content);
    return result;
  }
  //Create an error message if the update fails
  catch{
    console.error('putDb failed.');
  }
}

//Create a function to render the contents of the database to the webpage
export const getDb = async () => {
  try{
    console.log('GET all from the database');
    //Open the database and set the permissions to read the database
    const textdbDb = await openDB('jate', 1);
    const allTx = textdbDb.transaction('jate', 'readonly');
    const store = allTx.objectStore('jate');
    //Get all the items in the database
    const request = store.getAll();
    const result = await request;
    console.log('The following values were found:', result);
    return result;
  }
  catch{
    console.error('getDb failed');
  }
}

//Run the database operation function
initdb();
