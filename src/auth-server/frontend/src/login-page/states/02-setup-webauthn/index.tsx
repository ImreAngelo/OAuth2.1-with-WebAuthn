import { startRegistration } from '@simplewebauthn/browser';
// import { createSignal } from 'solid-js';
import { style } from '../shared';

// props: StatePropsType
export default function RegisterState() {
    // const [keys] = createSignal<any>([]);
    // const addKey = (k: any) => setKeys([...keys(), k]);

    return (
        <form id='registration-form' class={style['login-form']} 
            onSubmit={(e) => {e.preventDefault()}}
        >
            <div class={style.header}>
                <h1>Welcome to Blank</h1>
            </div>
            <h2>Add WebAuthn Keys</h2>
            <p class='muted'>
                Before your registration can be completed, 
                you must add at least one webauthn key which 
                will be used for authentication. Feel free 
                to add additional keys with your phone, etc.
            </p>
            <div class={style.fields}>
                {/* {keys()
                    .map((v: any) => (
                        <div>
                            <div
                                class="px-3 py-1 bg-blue-500 text-white rounded"
                            >
                                {v.username}
                            </div>
                        </div>
                    ))
                } */}
            </div>
            <button class={style.btn} onClick={() => {
                fetch('/webauthn/register/options', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ key_name: 'example' })
                })
                .then(async res => await res.json())
                .then(opt => { console.log(opt); return opt })
                .then(opt => startRegistration({ optionsJSON: opt }))
                .then(reg => {
                    console.log("REG:", reg);
                })
                // .then(reg => fetch('/auth/register/verify', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify({ ...reg, state: state }),
                // }))
                // // TODO: Graceful error handling
                // .then(result => {
                //     console.log("Result:", result);

                //     // TODO: Whitelist redirect urls
                //     if(!result.url?.startsWith("https://localhost/login_success"))
                //         throw new Error("Something went wrong...");

                //     window.location.href = result.url;
                //     res(true);
                // })
                .catch(e => {
                    console.error("[WebAuthn] Registration", e)
                })
            }}>
                Add key
            </button>
        </form>
    )
}
