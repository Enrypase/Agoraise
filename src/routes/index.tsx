import { A } from "@solidjs/router";
import { ParentProps } from "solid-js";

function Card(props: ParentProps & { href: string }) {
  return (
    <A
      href={props.href}
      class="py-2 px-2  border-2 border-solid border-main rounded-xl p-5 shadow-xl bg-white text:black  hover:bg-main hover:text-white transition-all"
    >
      {props.children}
    </A>
  );
}
export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-mainfont-thin uppercase my-16">Agoraise</h1>
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
            <h4>Raise</h4>
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
