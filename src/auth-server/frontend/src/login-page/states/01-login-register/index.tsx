import { style, type StatePropsType } from '../shared';
import getRegistrationOptions from './getRegistrationOptions';
import logo from '../../logo';


export default function StartState(props: StatePropsType) {
    // TODO: Add fade-out/in and waiting animation

    return (
        <form id='registration-form' class={style['login-form']} 
            onSubmit={(e) => getRegistrationOptions(e, props.setState)}
        >
            <div class={style.header}>
                {/* TODO: Inline logo */}
                <span class={style.logo}>
                    {logo()}
                </span>
                <h1>Welcome to Blank</h1>
            </div>
            <h2>Sign in to your account</h2>
            <p class='muted'>
                Make an account or log in using webauthn. 
                After making an account, you will be given 
                a set of backup keys and asked to 
                configure a new webauthn key.
            </p>
            <div class={style.fields}>
                <input
                    name='name'
                    type='text'
                    placeholder='Full name'
                    required
                    class={style.input}
                />
                <input
                    name='mail'
                    type='text'
                    placeholder='E-mail address'
                    required
                    class={style.input}
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
            </div>
            <button>
                Sign up
            </button>
            <div class='separator'>
                or sign in with
            </div>
            <LoginButton icon={fingerprint}>
                Passkey (WebAuthn)
            </LoginButton>
            {/* <button class={style.btn} onClick={(e) => { e.preventDefault(); console.log("TODO: Login with webauthn") }}>
                Passkey (WebAuthn)
            </button> */}
            <button class={style.btn} onClick={(e) => { e.preventDefault(); console.log("TODO: Login with keys") }}>
                Backup Key
            </button>
        </form>
    )
}

import fingerprint from "./noun-fingerprint.svg";

const LoginButton = ({ icon, children } : any) => (
    <button class={style.btn}>
        <div class={style['btn-icon']} style={{'background-image':`url(${icon})`}}/>
        <div>{children}</div>
    </button>
)

