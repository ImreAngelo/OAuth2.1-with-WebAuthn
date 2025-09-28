/* @refresh reload */
import { render } from 'solid-js/web'
import { Route, Router } from '@solidjs/router';
import { MetaProvider } from '@solidjs/meta';
import LoginPage from './login-page/index.tsx';
// import App from './App.tsx'
import './Globals.d.ts'
import './index.css'


const root = document.getElementById('root')

render(
    // root={App}>
    () => (
      <MetaProvider>
        <Router> 
          <Route path="/authorize" component={LoginPage} />
        </Router>
      </MetaProvider>
    ),
    root!
);
