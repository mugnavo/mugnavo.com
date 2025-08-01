import { Match, Switch, createSignal, type JSX } from "solid-js";

// TODO: use proper accessible form elements
// also, other types of forms, like with budget range etc.
export default function ContactForm() {
  let messageNameRef: HTMLInputElement | undefined;
  let messageEmailRef: HTMLInputElement | undefined;
  let messageTextRef: HTMLTextAreaElement | undefined;

  const [status, setStatus] = createSignal<null | "sent" | "error" | "sending">(null);

  const sendMessage: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (e) => {
    e.preventDefault();
    if (!messageTextRef || !messageNameRef || !messageEmailRef) return;
    const messageText = messageTextRef.value;
    const messageName = messageNameRef.value;
    const messageEmail = messageEmailRef.value;

    if (messageText && status() === null) {
      setStatus("sending");
      try {
        const res = await fetch("/contact/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: messageName,
            email: messageEmail,
            text: messageText,
          }),
        });
        if (res && res.ok) {
          messageTextRef.value = "";
          setStatus("sent");
          setTimeout(() => {
            setStatus(null);
          }, 16000);
        } else {
          throw new Error("Invalid response");
        }
      } catch (err) {
        console.error(err);

        setStatus("error");
        setTimeout(() => {
          setStatus(null);
        }, 5000);
      }
    }
  };
  return (
    <form onSubmit={sendMessage} class="flex w-full max-w-[60ch] flex-col items-center gap-4">
      <div class="flex w-full flex-wrap gap-4">
        <label
          for="name"
          class="focus-within:border-primary/30 focus-within:ring-primary/30 bg-card relative block min-w-64 flex-1 overflow-hidden rounded-lg border border-neutral-800 px-3 pt-3 shadow-xs focus-within:ring-1"
        >
          <input
            type="text"
            name="name"
            id="name"
            required
            ref={messageNameRef}
            placeholder="Name"
            class="peer h-8 w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
          />

          <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-neutral-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Name
          </span>
        </label>
        <label
          for="email"
          class="focus-within:border-primary/30 focus-within:ring-primary/30 bg-card relative block min-w-64 flex-1 overflow-hidden rounded-lg border border-neutral-800 px-3 pt-3 shadow-xs focus-within:ring-1"
        >
          <input
            type="email"
            name="email"
            id="email"
            required
            ref={messageEmailRef}
            placeholder="Email"
            class="peer h-8 w-full border-none bg-transparent placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
          />

          <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-neutral-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
            Email address
          </span>
        </label>
      </div>
      <label
        for="text"
        class="focus-within:border-primary/30 focus-within:ring-primary/30 bg-card relative block w-full overflow-hidden rounded-lg border border-neutral-800 px-3 pt-3 shadow-xs focus-within:ring-1"
      >
        <textarea
          name="text"
          id="text"
          rows={6}
          required
          ref={messageTextRef}
          placeholder="How can we help?"
          class="peer w-full resize-none border-none bg-transparent pt-2 placeholder-transparent focus:border-transparent focus:ring-0 focus:outline-hidden"
        />

        <span class="absolute start-3 top-3 -translate-y-1/2 text-xs text-neutral-400 transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          How can we help?
        </span>
      </label>
      <div class="flex w-full justify-between">
        <div class="flex flex-col text-sm text-neutral-400">
          Prefer direct emails?
          <a href="mailto:hello@mugnavo.com" class="text-neutral-50 hover:underline">
            hello@mugnavo.com
          </a>
        </div>
        <button
          type="submit"
          class={
            "active:border-primary flex max-w-full cursor-pointer items-center justify-center gap-1 rounded-xl border-2 border-transparent px-8 py-2 font-semibold text-neutral-950 shadow-md transition-all duration-200 hover:brightness-70 disabled:pointer-events-none " +
            (status() === "sent"
              ? "bg-green-300"
              : status() === "error"
                ? "bg-red-400"
                : "bg-neutral-100")
          }
          disabled={status() !== null}
        >
          {status() === "sent" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-6 w-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
          <Switch>
            <Match when={status() === "error"}>Error. Not sent.</Match>
            <Match when={status() === "sending"}>Sending...</Match>
            <Match when={status() === "sent"}>Sent!</Match>
            <Match when={status() === null}>Send</Match>
          </Switch>
        </button>
      </div>
    </form>
  );
}
