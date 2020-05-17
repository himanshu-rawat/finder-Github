import { createContext } from 'react';

const githubContext = createContext();

function add() {
	console.log('This is in the new Branch ContextAPI');
}

export default githubContext;
