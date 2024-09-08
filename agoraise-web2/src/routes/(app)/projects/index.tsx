import { A } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import axios, { AxiosResponse } from "axios";
import { For } from "solid-js";
import { useClientSession } from "~/hooks/sessionHooks";
import { BASE_URL } from "~/libs/variables";
import { SolidMarkdown } from "solid-markdown";

function Project(props: ProjectType & { id: string }) {
  return (
    <A
      href={`./${props.id}`}
      class="relative flex flex-col overflow-hidden rounded-xl shadow-xl transition-all hover:shadow-2xl"
    >
      <div
        class="h-32 w-full bg-cover bg-center bg-no-repeat"
        style={{
          "background-image": props.mainImage.startsWith("blob:")
            ? `url(${props.mainImage})`
            : `url(https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${props.mainImage})`,
        }}
      />
      <div class="relative">
        <div
          class="absolute left-5 top-0 size-16 -translate-y-1/2 rounded-full bg-cover bg-center bg-no-repeat"
          style={{
            "background-image": props.logoImage.startsWith("blob:")
              ? `url(${props.logoImage})`
              : `url(https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${props.logoImage})`,
          }}
        />
        <h4 class="px-5 pt-8">{props.title}</h4>
        <SolidMarkdown class="px-5 pb-5 text-darkGray">{props.mainDescription}</SolidMarkdown>
      </div>
    </A>
  );
}
export default function Projects() {
  const { projects } = useClientSession();
  const data = createQuery(() => ({
    queryKey: ["projects"],
    queryFn: async () => {
      const data = await Promise.all<AxiosResponse<ProjectType>>(
        projects().map((p) => axios.get(`${BASE_URL}/api/v0/projects/${p}`)),
      );
      return data.map((data) => data.data);
    },
  }));
  return (
    <div class="flex flex-col gap-5 p-5">
      <h1 class="text-center">Active Projects:</h1>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-5 pb-5">
        <For each={data.data}>{(p, i) => <Project {...p} id={projects()[i()]} />}</For>
      </div>
    </div>
  );
}
