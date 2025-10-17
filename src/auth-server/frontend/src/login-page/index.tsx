import { Title } from "@solidjs/meta";
import { createSignal, Match, Switch } from "solid-js";
import RegisterState from "./states/02-setup-webauthn";
import StartState from "./states/01-login-register";
import style from './login.module.css';

export type State = 'START' | 'REGISTER' | 'COMPLETE';

export default function LoginPage() {
    const [state, setState] = createSignal<State>('START');


    // TODO: Send login options with initial request
    // const [loginOptions, setLoginOptions] = createSignal({});
    // createEffect(() => {
    //     fetch('/webauthn/login/options', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         // body: JSON.stringify({ state: state }),
    //     })
    //     .then(async r => setLoginOptions(await r.json()))
    // }, []);
    // createEffect(() => { console.log("Updated login options: ", loginOptions()) }, [loginOptions]);

    return (
        <>
        <>
            <Title>Sign in to Blank</Title>
        </>
        <div class={style.wrapper}>
            <div class={style.plain}>
                <Switch>
                    <Match when={state() === 'START'}><StartState setState={setState}/></Match>
                    <Match when={state() === 'REGISTER'}><RegisterState/></Match>
                </Switch>
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