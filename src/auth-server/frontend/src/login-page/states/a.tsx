import { register } from '../../webauthn/register';
import style from './a.module.css';

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


export default function FormStateA() {
    return (
        <form id='registration-form' class={style['login-form']} onSubmit={getRegistrationOptions}>
            <div>
                {/* Logo here */}
                <h1>Welcome to Blank</h1>
            </div>
            <h2>Sign in to your account</h2>
            <p class='muted'>
                Make an account or log in using webauthn. Please enter your email address. 
                If you've purchased our products before, use the same email to access 
                your purchase history and pre-filled account details.
            </p>
            <input
                name='name'
                type='text'
                placeholder='Full name'
                required
            />
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
            <div class='separator'>
                or log in with
            </div>
            <button onClick={(e) => { e.preventDefault(); console.log("TODO: Login") }}>
                Passkey (WebAuthn)
            </button>
        </form>
    )
}