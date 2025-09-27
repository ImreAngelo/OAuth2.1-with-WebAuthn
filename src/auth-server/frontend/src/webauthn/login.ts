import { startAuthentication } from '@simplewebauthn/browser';
// import authorize from '../oauth2/authorize';

export function login(): Promise<boolean> {
    console.log("Loggin in...");

    // // POST to get registration options from the endpoint that calls
    // return new Promise((res, rej) => {
    //     let state = "";

    //     authorize()
    //     .then(st => (state = st))
    //     .then(() => fetch('/auth/login/webauthn', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ state: state }),
    //     }))
    //     .then(async res => await res.json())
    //     // TODO: Use navigator.credentials on clientside
    //     .then(optionsJSON => startAuthentication({ optionsJSON })) 
    //     .then(authn => fetch('/auth/login/verify', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ ...authn, state: state }),
    //     }))
    //     // TODO: Error handling
    //     .then(result => {
    //         console.log("Authentication result:", result);

    //         // // TODO: Whitelist redirect urls
    //         if(!result.url?.startsWith("https://localhost/login_success"))
    //             throw new Error("Something went wrong...");

    //         window.location.href = result.url;
    //         res(true);
    //     })
    //     .catch(e => {
    //         console.error("Error happened: ", e)
    //         rej(false)
    //     })
    // })

    return Promise.resolve(true);
}