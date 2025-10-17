export default function getRegistrationOptions(e: SubmitEvent) {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    console.log("Form submitted with data:", data);

    // TODO: Submit data -> Start registration session on server
}