import { A } from "@solidjs/router";
import { ParentProps } from "solid-js";

function Card(props: ParentProps & { href: string }) {
  return (
    <A
      href={props.href}
      class="rounded-xl border-2  border-solid border-main bg-white p-2 text-black shadow-xl transition-all  hover:bg-main hover:text-white"
    >
      {props.children}
    </A>
  );
}
export default function Home() {
  return (
    <main class="mx-auto p-4 text-center text-gray">
      <h1 class="p-5 text-main">Agoraise</h1>
      <div class="flex justify-center">
        <div class="grid grid-cols-2 gap-2">
          <Card href="/projects">
            <h4 class="uppercase">Donate</h4>
            <p>Transparent by Design</p>
            <p>Simple to understand</p>
            <p>Secure</p>
            <p>Influence the projects you're interested in</p>
          </Card>
          <Card href="/create">
            <h4 class="uppercase">Raise</h4>
            <p>Built-in community interactions</p>
            <p>Leverage every Social Media</p>
            <p>Feeless Charity Donations</p>
            <p>Competitive Fees</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
