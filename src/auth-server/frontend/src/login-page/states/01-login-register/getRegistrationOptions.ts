import type { Setter } from "solid-js";
import type { State } from "../..";

export default function getRegistrationOptions(e: SubmitEvent, setState: Setter<State>) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    console.log("Form submitted with data:", data);

    // TODO: Submit data -> Start registration session on server
    fetch('/user/register/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, mail: data.mail }),
    })
    .then(r => r.json())
    .then(r => {
        if(r.success) setState('REGISTER');
        // TODO: Suspense animation + error handling
    })
}