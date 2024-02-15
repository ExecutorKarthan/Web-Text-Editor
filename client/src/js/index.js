//Import needed libraries
import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

//Select the main item - the item that holds the editor
const main = document.querySelector('#main');
main.innerHTML = '';

//Added a variable to create sections, appending class values to format the divs
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

//Create an editor for user to type in
const editor = new Editor();

//If there is no editor, apply the spinner formatting
if (typeof editor === 'undefined') {
  loadSpinner();
}

//Test for service worker support
if ('serviceWorker' in navigator) {
  //Register the service worker
  const workboxSW = new Workbox('./src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
