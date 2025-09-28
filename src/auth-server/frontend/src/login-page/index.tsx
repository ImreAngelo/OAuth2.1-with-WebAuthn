import { Route, Router } from '@solidjs/router';
import style from './login.module.css';
import FormStateA from './states/a';

export default function LoginPage() {
    return (
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
                    <p>Slogan goes</p>
                    <p>here</p>
                </div>
            </div>
        </div>
    )
}