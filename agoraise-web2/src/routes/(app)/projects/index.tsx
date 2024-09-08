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
      class="relative flex flex-col gap-2 rounded-xl p-5 shadow-xl transition-all hover:shadow-2xl"
    >
      <h4>{props.title}</h4>
      <SolidMarkdown>{props.mainDescription}</SolidMarkdown>
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
    <div class="p-5">
      <h1 class="text-center">Active Projects:</h1>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-5 pb-5">
        <For each={data.data}>{(p, i) => <Project {...p} id={projects()[i()]} />}</For>
      </div>
    </div>
  );
}
