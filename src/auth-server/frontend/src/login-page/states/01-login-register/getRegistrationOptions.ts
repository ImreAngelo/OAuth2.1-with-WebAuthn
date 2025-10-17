import type { Setter } from "solid-js";
import type { State } from "../..";

export default function getRegistrationOptions(e: SubmitEvent, setState: Setter<State>) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    console.log("Form submitted with data:", data);

    // TODO: Submit data -> Start registration session on server
    setState('REGISTER');
}