// import { Route, Router } from '@solidjs/router';
import { Title } from "@solidjs/meta";
import style from './login.module.css';
import FormStateA from './states/a';

export default function LoginPage() {
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
                <FormStateA/>
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