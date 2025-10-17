// import { Route, Router } from '@solidjs/router';
import { Title } from "@solidjs/meta";
import { createEffect, createSignal } from "solid-js";
import StartState from "./states/01-login-register";
import style from './login.module.css';

export default function LoginPage() {
    const [loginOptions, setLoginOptions] = createSignal({});

    // TODO: Send login options with initial request -> check if stale
    createEffect(() => {
        fetch('/webauthn/login/options', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ state: state }),
        })
        .then(async r => setLoginOptions(await r.json()))
    }, []);

    createEffect(() => { console.log("Updated login options: ", loginOptions()) }, [loginOptions]);

    return (
        <>
        <>
            <Title>Sign in to Blank</Title>
        </>
        <div class={style.wrapper}>
            <div class={style.plain}>
                {/* <Router>
                    <Route />
                </Router> */}
                <StartState/>
                <footer class={`${style.footer} muted`}>
                    Copyright &copy; 2025
                </footer>
            </div>
            <div class={style.background}>
                <div class={style.slogan}>
                    State-of-the-art passwordless <br/>
                    authentication and authorization
                </div>
            </div>
        </div>
        </>
    )
}