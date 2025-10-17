import { style } from '../shared';

// props: StatePropsType
export default function RegisterState() {
    // TODO: Add fade-out/in and waiting animation

    return (
        <form id='registration-form' class={style['login-form']} 
            onSubmit={(e) => {e.preventDefault()}}
        >
            <div class={style.header}>
                {/* TODO: Inline logo */}
                {/* <span class={style.logo}>
                    {logo()}
                </span> */}
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
                <div>
                    List keys here
                </div>
            </div>
            <button class={style.btn} onClick={(e) => { 
                e.preventDefault(); console.log("TODO: Login with keys") 
            }}>
                Add key
            </button>
        </form>
    )
}
