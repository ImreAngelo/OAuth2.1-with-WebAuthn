// import { createSignal } from 'solid-js'
// import solidLogo from './assets/solid.svg'
// import viteLogo from '/vite.svg'
// import { createEffect } from 'solid-js';
// import { useSubmission } from '@solidjs/router';
import './App.css'

function App({ children }) {
	// const submission = useSubmission(submitRegistration);

	// createEffect(() => {
	// 	console.log("The count is now", count());
	// }, []);

	return (
		<div>
			{children}
		</div>
	)
}

export default App
