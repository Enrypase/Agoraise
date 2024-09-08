import { A, useParams, useSearchParams } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import axios from "axios";
import { createSignal, For, Setter, Show } from "solid-js";
import { SolidMarkdown } from "solid-markdown";
import DonutChart from "~/components/charts/DonutChart";
import Social from "~/components/Social";
import Svg from "~/components/Svg";
import { useClientSession } from "~/hooks/sessionHooks";
import Form, { Input } from "~/libs/form";
import { BASE_URL } from "~/libs/variables";

const fullMoc = {
  metadata: {
    id: 0,
    type: 0,
    title: "Hello",
    description: "Lorem Ipsum is Lorem Ipsum Lorem Ipsum lorem. Lorem Ipsum is Lorem Ipsum",
    target: 50000,
  },
  owner: "0x...",
  raised: 0,
  users: 0,
  state: "active",
};

type VotationType = { title: string; description: string; options: string[] }[];

function Votations(props: { title: string; votations: VotationType; setVotations: Setter<VotationType> }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { votePower, setVotePower } = useClientSession();
  const [hasVoted, setHasVoted] = createSignal(-1);
  return (
    <div id="votations" class="rounded-xl p-5 shadow-xl">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-col gap-2">
          <h1>Votations</h1>
          <p>Wanna contribute to {props.title}? Here you can do that!</p>
        </div>
        <p class="rounded-full bg-gray px-8 py-2 text-main">
          <span>{votePower()}</span> Vote-Power
        </p>
      </div>
      <div class="flex flex-col-reverse gap-5 p-5 md:grid md:grid-cols-[max(min(25rem,25vw),333px),auto]">
        <div class="flex max-h-[75vh] flex-col gap-2 overflow-auto">
          <For each={props.votations}>
            {(v, i) => (
              <button
                id={`votation_${i()}`}
                onClick={() => setSearchParams({ votation: i() })}
                classList={{ "bg-gray": searchParams.votation ? parseInt(searchParams.votation) === i() : false }}
                class="mr-1 rounded-xl"
              >
                <h4>{v.title}</h4>
                <p>{v.description}</p>
              </button>
            )}
          </For>
          <Form
            class="mr-1 flex flex-col gap-2 rounded-xl"
            successCallback={(data) => {
              props.setVotations((v) => [...v, { title: data.title, description: data.description, options: [] }]);
            }}
          >
            <Input title="Title" type="text" name="title" />
            <Input title="Description" type="text" name="description" />
            <Input type="submit" value="Create New Votation!" name="" />
          </Form>
        </div>
        <div class="flex size-full min-h-[45dvh] grow flex-col gap-5 rounded-xl">
          <Show when={searchParams.votation} fallback={<div class="size-full grow rounded-xl bg-gray" />}>
            <For each={props.votations[parseInt(searchParams.votation!)].options}>
              {(o, i) => (
                <Show
                  when={hasVoted() === -1}
                  fallback={
                    <div class="relative flex h-10 w-full items-center justify-center overflow-hidden rounded-xl bg-main py-2 text-white">
                      {hasVoted() === i() ? <p>{o}: 100%</p> : <p>{o}: 0%</p>}
                    </div>
                  }
                >
                  <button
                    class="flex h-10 w-full items-center justify-center rounded-xl bg-main py-2 text-white"
                    onClick={() => {
                      setHasVoted(i());
                      setVotePower((v) => v + 0.1);
                    }}
                  >
                    <p>{o}</p>
                  </button>
                </Show>
              )}
            </For>
            <input
              type="text"
              class="w-full rounded-xl border-2 border-solid border-main px-6 py-2"
              onBlur={(e) => {
                const arr = [...props.votations];
                arr[parseInt(searchParams.votation!)].options.push(e.target.value);
                props.setVotations(arr);
              }}
            />
          </Show>
        </div>
      </div>
    </div>
  );
}

export default function Project(props?: ProjectType) {
  const params = useParams();
  const data = !props?.title
    ? createQuery<ProjectType>(() => ({
        queryKey: ["projects", params.id],
        queryFn: async () => {
          return (await axios.get(`${BASE_URL}/api/v0/projects/${params.id}`)).data;
        },
      }))
    : { data: null };
  const [colors, setColors] = createSignal<string[]>([]);
  const mainImage = () => props?.mainImage || data.data?.mainImage || "";
  const logoImage = () => props?.logoImage || data.data?.logoImage || "";
  const title = () => props?.title || data.data?.title || "Defaulted";
  const type = () => props?.type || data.data?.type || "Defaulted";
  const mainDescription = () => props?.mainDescription || data.data?.mainDescription || "Defaulted";
  const mainPaymentsDescription = () =>
    props?.mainPaymentsDescription || data.data?.mainPaymentsDescription || "Defaulted";
  const sm = () => props?.sm || data.data?.sm || "No";
  const socialsTitle = () => props?.socialsTitle || data.data?.socialsTitle || "Defaulted";
  const socialsDescription = () => props?.socialsDescription || data.data?.socialsDescription || "Defaulted";
  const paymentsTitle = () => props?.paymentsTitle || data.data?.paymentsTitle || "Defaulted";
  const paymentsDescription = () => props?.paymentsDescription || data.data?.paymentsDescription || "Defaulted";
  const tags = () => props?.tags || data.data?.tags || "DefaultedTag";
  const socials = () => props?.socials || data.data?.socials || "https://defaulted";
  const [votations, setVotations] = createSignal<{ title: string; description: string; options: string[] }[]>([]);
  return (
    <div class="min-h-screen p-5">
      <div class="relative grid gap-5 md:grid-cols-[auto,min(max(20rem,33vw),500px)]">
        <div class="relative row-start-2 md:row-start-1">
          <div class="sticky left-0 top-0 flex flex-col gap-2 py-5">
            <div class="flex flex-wrap gap-2">
              <div class="relative flex grow flex-col justify-end rounded-xl bg-blue p-5 text-white">
                <p>Total users</p>
                <h4 class="font-bold">{fullMoc.users}</h4>
                <Svg class="w-full max-w-48" attr={{ viewBox: "0 0 137 97" }} href="/icons/usersBg.svg#usersBg" />
                <Svg
                  class="absolute right-5 top-5 size-12 rounded-full bg-[rgba(255,255,255,0.1)] p-1"
                  attr={{ viewBox: "0 0 137 97" }}
                  href="/icons/usersSmb.svg#usersSmb"
                />
              </div>
              <div class="flex grow flex-col gap-2">
                <div class="relative overflow-hidden rounded-xl rounded-bl-none bg-blue p-5 text-white">
                  <p>Total Donations</p>
                  <h4 class="font-bold">${fullMoc.raised}</h4>
                  <Svg
                    class="absolute left-0 top-0 w-full max-w-48 -translate-x-1/2 -translate-y-1/2"
                    attr={{ viewBox: "0 0 135 105" }}
                    href="/icons/donationsBg.svg#donationsBg"
                  />
                  <Svg
                    class="absolute right-5 top-5 size-12 rounded-full bg-[rgba(255,255,255,0.1)] p-1"
                    attr={{ viewBox: "0 0 137 97" }}
                    href="/icons/donationsSmb.svg#donationsSmb"
                  />
                </div>
                <div class="relative rounded-xl rounded-tl-none bg-gray p-5 text-white">
                  <p class="text-darkGray">Total Votations</p>
                  <h4 class="font-bold text-main">{votations().length}</h4>
                  <Svg
                    href="/icons/votations.svg#votations"
                    attr={{ viewBox: "0 0 17 18" }}
                    class="absolute right-5 top-5 size-12 rounded-full bg-[rgba(255,255,255,0.6)] p-1"
                  />
                </div>
                <div class="flex justify-between rounded-xl rounded-tl-none bg-main p-5 text-white">
                  <p>Project Type</p>
                  <small class="font-bold">{type()}</small>
                </div>
              </div>
              <div class="relative flex grow flex-col gap-2 rounded-xl bg-gray p-5">
                <h4>Active Votations:</h4>
                <div class="flex max-h-48 flex-col gap-1 overflow-auto">
                  <For each={votations()}>
                    {(v) => (
                      <div class="flex gap-2">
                        <p class="text-main">{v.title}</p>
                        <p class="text-darkGray">{v.description}</p>
                      </div>
                    )}
                  </For>
                </div>
              </div>
            </div>
            <div class="w-full rounded-xl p-5 shadow-xl">
              <div class="flex items-center gap-1">
                <Svg href="/icons/globe.svg#globe" attr={{ viewBox: "0 0 20 19" }} class="size-6" />
                <h4>About This Project</h4>
              </div>
              <SolidMarkdown class="text-darkGray">{mainDescription()}</SolidMarkdown>
            </div>
            <div class="flex w-full flex-col gap-5 rounded-xl p-5 shadow-xl">
              <h4>Interact With {title()}</h4>
              <SolidMarkdown class="text-darkGray">{mainPaymentsDescription()}</SolidMarkdown>
              <div class="grid grid-cols-2 gap-5">
                <Show when={sm() === "Yes"}>
                  <div class="relative flex flex-col gap-2 rounded-xl p-5 shadow-xl">
                    <SolidMarkdown class="text-darkGray">{socialsDescription()}</SolidMarkdown>
                    <h6 class="uppercase">{socialsTitle()}</h6>
                    <div class="absolute bottom-0 right-0 size-10 translate-x-2 translate-y-2 rounded-full bg-blue p-2">
                      <Svg href="/icons/arrow.svg#arrow" attr={{ viewBox: "0 0 29 29" }} class="h-full" />
                    </div>
                  </div>
                </Show>
                <div class="relative flex flex-col gap-2 rounded-xl p-5 shadow-xl">
                  <SolidMarkdown class="text-darkGray">{paymentsDescription()}</SolidMarkdown>
                  <h6 class="uppercase">{paymentsTitle()}</h6>
                  <div class="absolute bottom-0 right-0 size-10 translate-x-2 translate-y-2 rounded-full bg-blue p-2">
                    <Svg href="/icons/arrow.svg#arrow" attr={{ viewBox: "0 0 29 29" }} class="h-full" />
                  </div>
                </div>
              </div>
              <button class="flex w-full justify-center gap-1 rounded-xl bg-main p-2 text-center text-white">
                <p> Need Help?</p> <Svg href="/icons/lamp.svg#lamp" attr={{ viewBox: "0 0 15 14" }} class="size-6" />
              </button>
            </div>
          </div>
        </div>
        <div class="relative row-start-1 md:row-start-1">
          <div class="sticky left-0 top-0 flex flex-col gap-10 py-5">
            <div class="overflow-hidden rounded-xl shadow-xl">
              <div
                class="h-32 w-full bg-cover bg-center bg-no-repeat"
                style={{
                  "background-image": mainImage().startsWith("blob:")
                    ? `url(${mainImage()})`
                    : `url(https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${mainImage()})`,
                }}
              />
              <div class="relative flex flex-col gap-5 p-10">
                <div
                  class="absolute left-10 top-0 size-16 -translate-y-1/2 rounded-full bg-contain bg-center bg-no-repeat"
                  style={{
                    "background-image": logoImage().startsWith("blob:")
                      ? `url(${logoImage()})`
                      : `url(https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${logoImage()})`,
                  }}
                />
                <h4>{title()}</h4>
                <div class="flex gap-2">
                  <For each={tags().split(" ")}>
                    {(t) => <p class="rounded-xl bg-blue px-2 py-1 text-white">{t}</p>}
                  </For>
                </div>
                <div class="flex items-center gap-2">
                  <p>Community</p>
                  <div class="flex gap-1">
                    <For each={socials().split(" ")}>
                      {(s) => (
                        <A href={s} target="_blank">
                          <Social name={s.split("://")[1].split(".")[0].toLowerCase()} />
                        </A>
                      )}
                    </For>
                  </div>
                </div>
                {/*
<div class="flex flex-col gap-2">
                  <p>Official Links</p>
                  <div class="flex gap-1">
                    <A
                      href=""
                      target="_blank"
                      class="flex items-center gap-1 rounded-xl bg-green-200 px-2 py-1 text-green-700"
                    >
                      <p>LINK 1</p>
                      <Svg href="/icons/link.svg#link" attr={{ viewBox: "0 0 14 14" }} class="size-4 text-main" />
                    </A>
                    <A
                      href=""
                      target="_blank"
                      class="flex items-center gap-1 rounded-xl bg-green-200 px-2 py-1 text-green-700"
                    >
                      <p>LINK 2</p>
                      <Svg href="/icons/link.svg#link" attr={{ viewBox: "0 0 14 14" }} class="size-4 text-main" />
                    </A>
                  </div>
                </div>
                  */}
              </div>
            </div>
            <div class="overflow-hidden rounded-xl p-10 shadow-xl">
              <h4>Funding</h4>
              <div class="flex flex-col items-center justify-center">
                <div class="relative">
                  <DonutChart
                    series={(props?.milestones || data.data?.milestones || []).map((el, i) => {
                      const data = { number: parseInt(el.amount.toString()), notActive: i > 0 };
                      console.log(data);
                      return data;
                    })}
                    labels={(props?.milestones || data.data?.milestones || []).map((_m, i) => `Milestone ${i}`)}
                    setColors={(data) => setColors(data)}
                  />
                </div>
                <div class="flex flex-wrap gap-1">
                  <For each={colors()}>
                    {(background, i) => (
                      <p class="rounded-xl px-6 py-2 text-white" style={{ background }}>
                        Milestone {i()}
                      </p>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">{/*<div>Milestone</div>*/}</div>
      <Votations title={title()} votations={votations()} setVotations={setVotations} />
    </div>
  );
}
