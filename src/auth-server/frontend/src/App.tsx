// import { createSignal } from 'solid-js'
// import solidLogo from './assets/solid.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
	// const [count, setCount] = createSignal(0)

	return (
	<>
		<div class='wrapper'>
			<div class='plain'>
				<form class='login-form'>
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
					<button>
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
