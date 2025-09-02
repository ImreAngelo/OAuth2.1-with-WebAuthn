<picture>
  <source
    width="100%"
    srcset="./docs/img/banner-dark-1700x600.png"
    media="(prefers-color-scheme: dark)"
  />
  <source
    width="100%"
    srcset="./docs/img/banner-light-1700x600.avif"
    media="(prefers-color-scheme: light), (prefers-color-scheme: no-preference)"
  />
  <img width="250" src="./docs/content/public/banner-light-1700x600.avif" />
</picture>


<h1 align="center">OAuth 2.1 with WebAuthn</h1>

<p align="center">
    OAuth 2.1 is the de-facto standard for allowing third-parties to securely access API resources. WebAuthn allows authentication with hardware keys embedded in laptops and phones etc., solving the problem of users using weak or previously used passwords. Putting these together represents the state-of-the-art for authentication and third-party API authorization.
</p>

<p align="center">
    <img alt="GitHub License" src="https://img.shields.io/github/license/ImreAngelo/OAuth2.1-with-WebAuthn">
    <!-- ![example workflow](https://github.com/github/docs/actions/workflows/main.yml/badge.svg) -->
</p>

> [!WARNING]
> **For testing WebAuthn:** Each WebAuthn registration will be stored on your computer unless manually removed. Having many registrations can slow down the speed of all using WebAuthn to log in. I recommend using <a href="https://developer.chrome.com/docs/devtools/webauthn">emulated authenticators</a> in Chrome DevTools to avoid clogging up your WebAuthn storage.  

## Configure Vault
For the project to work out of the box, vault must be configured with the correct. This can be done automatically with the command: 

```shell
make x
```

> [!TIP]
> You can reload a single Docker container by running `make service` where service is the name of the server. 
>
> For instance, `make vault` will build and restart the vault container.

## OAuth 2.1 Protocol
- [ ] Show sequence diagram of correct flow and explain

### PKCE
- [ ] Explain PKCE
