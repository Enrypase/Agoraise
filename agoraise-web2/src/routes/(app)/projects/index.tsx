import { A } from "@solidjs/router";
import { For } from "solid-js";

const moc = [
  {
    metadata: {
      id: 0,
      type: 0,
      title: "Hello",
      description: "Lorem Ipsum is Lorem Ipsum Lorem Ipsum lorem. Lorem Ipsum is Lorem Ipsum",
      target: 50000,
    },
    owner: "0x...",
    raised: 4000,
    state: "active",
  },
];

function Project(props: ExtractArrayElementType<typeof moc>) {
  const perc = () => (props.raised / props.metadata.target) * 100;
  return (
    <A
      href={`./${props.metadata.id}`}
      class="relative flex flex-col gap-2 rounded-xl p-5 shadow-xl transition-all hover:shadow-2xl"
    >
      <h4>{props.metadata.title}</h4>
      <p>{props.metadata.description}</p>
      <div class="relative h-2 w-full overflow-hidden rounded-xl">
        <div class="h-full bg-black" style={{ width: `${perc()}%` }} />
      </div>
      <small class="absolute bottom-0 right-0">{props.owner}</small>
    </A>
  );
}
export default function Projects() {
  return (
    <div class="p-5">
      <h1 class="text-center">Active Projects:</h1>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-5 pb-5">
        <For each={moc}>{(p) => <Project {...p} />}</For>
      </div>
    </div>
  );
}
