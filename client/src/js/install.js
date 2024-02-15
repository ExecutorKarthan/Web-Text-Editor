//Import needed library
const butInstall = document.getElementById('buttonInstall');

//Add a window to be triggered on clicking the install button
window.addEventListener('beforeinstallprompt', (event) => {
     // Store the triggered events
     window.deferredPrompt = event;

     //Update the class to unhide the window
     butInstall.classList.toggle('hidden', false);
});

//Add a window to be triggered on clicking the install button
butInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }
  
    //Display the event prompt
    promptEvent.prompt();
    
    //Reset the prompt to limit use to once
    window.deferredPrompt = null;
    
    //Hide the prompt after it was used
    butInstall.classList.toggle('hidden', true);

});

//Add a listener that resets the prompt after the app was installed
window.addEventListener('appinstalled', (event) => {
    //Clear prompt
    window.deferredPrompt = null;
});
