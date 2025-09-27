// import { createSignal } from 'solid-js'
// import solidLogo from './assets/solid.svg'
// import viteLogo from '/vite.svg'
// import { createEffect } from 'solid-js';
// import { useSubmission } from '@solidjs/router';
import './App.css'
import { register } from './webauthn/register';

function getRegistrationOptions(e: SubmitEvent) {
	e.preventDefault();
	console.log("E: ", new FormData(e.target))

	// const { form } = e.val;

	// const formData = {
    //     name: name(),
    //     email: email(),
	// };

	const formData = {
		
	};

	console.log("Form submitted with data:", formData);

	// register()
}

function App() {
	// const submission = useSubmission(submitRegistration);

	// createEffect(() => {
	// 	console.log("The count is now", count());
	// }, []);

	return (
	<>
		<div class='wrapper'>
			<div class='plain'>
				<form id='registration-form' class='login-form' onSubmit={getRegistrationOptions}>
					<h1>Velkommen</h1>
					<p>Make an account or log in using webauthn</p>
					<div>
						<input
							name='firstname'
							type='text'
							placeholder='First name'
							required
						/>
						<input
							name='lastname'
							type='text'
							placeholder='First name (optional)'
						/>
					</div>
					<input
						name='mail'
						type='text'
						placeholder='E-mail address (optional)'
					/>
					<div>
						<input
							name='tos'
							type='checkbox'
							required
						/>
						<label for='tos'>
							<span>I agree to the</span>
							<a href="https://example.com/">Terms & Conditions</a> 
						</label>
					</div>
					<button>
						Lag konto
					</button>
					<div>
						or log in with
					</div>
					<button onClick={(e) => { e.preventDefault(); console.log("TODO: Login") }}>
						Passkey (WebAuthn)
					</button>
				</form>
			</div>
			<div class='background'>
				<div class='slogan'>
					<p>Slogan goes</p>
					<p>here</p>
				</div>
			</div>
		</div>
	</>
	)
}

export default App
