import { week1Content } from './js/weeks/week1.js';
import { week2Content } from './js/weeks/week2.js'; 
import { week3Content } from './js/weeks/week3.js'; 
import { UIManager } from './js/ui/UIManager.js';
import { StateManager } from './js/state/state.js';
import { EventHandler } from './js/events/EventHandler.js';

console.log("Week 3 Content:", week3Content); // Add this line

// Initialize managers
const stateManager = new StateManager();
const uiManager = new UIManager();
const eventHandler = new EventHandler(stateManager, uiManager);

// Initialize content
const weekContent = {
    1: week1Content,
    2: week2Content,
    3: week3Content,
    // Other weeks will be added later
};

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI with content
    uiManager.init(weekContent);
    
    // Set up event handling
    eventHandler.init();
    
    // Load saved state if any
    stateManager.loadState();
    
    // Initial render
    uiManager.updateUI(stateManager.getState());
    
    // Subscribe to state changes
    stateManager.subscribe((state) => {
        uiManager.updateUI(state);
    });
});
