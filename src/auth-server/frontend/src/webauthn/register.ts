import { startRegistration } from '@simplewebauthn/browser';

export function register(username: string, mail: string): Promise<boolean> {
	console.log("Registering: ", username);

	// POST to get registration options from the endpoint that calls
	return new Promise((res, rej) => {
		let state = "";

		// authorize()
		// .then(st => (state = st))
		// .then(() => fetch('/auth/register/webauthn', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ username: username, mail: mail, state: state }),
		// }))
		// .then(r => r.json())
		// .then(opt => startRegistration({ optionsJSON: opt })) 
		// .then(reg => fetch('/auth/register/verify', {
		// 	method: 'POST',
		// 	headers: { 'Content-Type': 'application/json' },
		// 	body: JSON.stringify({ ...reg, state: state }),
		// }))
		// // TODO: Graceful error handling
		// .then(result => {
		// 	console.log("Result:", result);

		// 	// TODO: Whitelist redirect urls
		// 	if(!result.url?.startsWith("https://localhost/login_success"))
		// 		throw new Error("Something went wrong...");

    	// 	window.location.href = result.url;
		// 	res(true);
		// })
		// .catch(e => {
		// 	console.error("[WebAuthn] Registration", e)
		// 	rej(false)
		// })

        res(false)
	})
}