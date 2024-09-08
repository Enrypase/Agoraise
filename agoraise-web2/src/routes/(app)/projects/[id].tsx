import { A, useSearchParams } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import DonutChart from "~/components/charts/DonutChart";
import Social from "~/components/Social";
import Svg from "~/components/Svg";

const fullMoc = {
  metadata: {
    id: 0,
    type: 0,
    title: "Hello",
    description: "Lorem Ipsum is Lorem Ipsum Lorem Ipsum lorem. Lorem Ipsum is Lorem Ipsum",
    target: 50000,
  },
  owner: "0x...",
  raised: 4000,
  users: 50,
  state: "active",
};
const votations = [
  {
    title: "Title",
    description: "Lorem Ipsum is Lorem Ipsum Lorem Ipsum",
  },
];

function Votations(props: { title: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div id="votations" class="rounded-xl p-5 shadow-xl">
      <h1>Votations</h1>
      <p>Wanna contribute to {props.title}? Here you can do that!</p>
      <div class="grid grid-cols-[max(min(25rem,25vw),333px),auto] gap-5 p-5">
        <div class="flex max-h-[75vh] flex-col gap-2 overflow-auto">
          <For each={Array.from({ length: 15 }).map(() => votations[0])}>
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
        </div>
        <div class="size-full rounded-xl bg-black" />
      </div>
    </div>
  );
}
export default function Project(props?: {
  mainImage: string;
  logoImage: string;
  title: string;
  tags: string[];
  mainDescription: string;
  type: string;
  socials: string[];
  mainPaymentsDescription: string;
  sm: "Yes" | "No";
  socialsTitle: string;
  socialsDescription: string;
  paymentsTitle: string;
  paymentsDescription: string;
}) {
  const [, setSearchParams] = useSearchParams();
  const [colors, setColors] = createSignal<string[]>([]);
  const mainImage = () => props?.mainImage || "";
  const logoImage = () => props?.logoImage || "";
  const title = () => props?.title || "Defaulted";
  const type = () => props?.type || "Defaulted";
  const mainDescription = () => props?.mainDescription || "Defaulted";
  const mainPaymentsDescription = () => props?.mainPaymentsDescription || "Defaulted";
  const sm = () => props?.sm || "No";
  const socialsTitle = () => props?.socialsTitle || "Defaulted";
  const socialsDescription = () => props?.socialsDescription || "Defaulted";
  const paymentsTitle = () => props?.paymentsTitle || "Defaulted";
  const paymentsDescription = () => props?.paymentsDescription || "Defaulted";
  const tags = () => props?.tags || ["Defaulted", "Defaulted"];
  const socials = () => props?.socials || ["Defaulted", "Defaulted"];
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
                  <h4 class="font-bold text-main">02</h4>
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
                  <For each={Array.from({ length: 8 }).map(() => votations[0])}>
                    {(v, i) => (
                      <div class="flex justify-between">
                        <div class="flex gap-1">
                          <p class="font-bold">{v.title}</p>
                        </div>
                        <button
                          class="mr-1 rounded-full bg-main px-5 py-1 text-white"
                          onClick={() => {
                            setSearchParams({ votation: i() });
                            document.getElementById("votations")!.scrollIntoView();
                          }}
                        >
                          Vote
                        </button>
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
              <p class="text-darkGray">{mainDescription()}</p>
            </div>
            <div class="flex w-full flex-col gap-5 rounded-xl p-5 shadow-xl">
              <h4>Interact With {title()}</h4>
              <p class="text-darkGray">{mainPaymentsDescription()}</p>
              <div class="grid grid-cols-2 gap-5">
                <Show when={sm() === "Yes"}>
                  <div class="flex flex-col gap-2 rounded-xl p-5 shadow-xl">
                    <p class="text-darkGray">{socialsDescription()}</p>
                    <h6 class="uppercase">{socialsTitle()}</h6>
                  </div>
                </Show>
                <div class="flex flex-col gap-2 rounded-xl p-5 shadow-xl">
                  <p class="text-darkGray">{paymentsDescription()}</p>
                  <h6 class="uppercase">{paymentsTitle()}</h6>
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
                class="h-32 w-full bg-contain bg-center bg-no-repeat"
                style={{ "background-image": `url(${mainImage()})` }}
              />
              <div class="relative flex flex-col gap-5 p-10">
                <div
                  class="absolute left-10 top-0 size-16 -translate-y-1/2 rounded-full bg-contain bg-center bg-no-repeat"
                  style={{ "background-image": `url(${logoImage()})` }}
                />
                <h4>{title()}</h4>
                <div class="flex gap-2">
                  <For each={tags()}>{(t) => <p class="rounded-xl bg-blue px-2 py-1 text-white">{t}</p>}</For>
                </div>
                <div class="flex items-center gap-2">
                  <p>Community</p>
                  <div class="flex gap-1">
                    <For each={socials()}>
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
                    series={[{ number: 12 }, { number: 33 }, { number: 10, notActive: true }]}
                    labels={["On", "Du", "Tr"]}
                    setColors={(data) => setColors(data)}
                  />
                  <h4 class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">$55</h4>
                </div>
                <div class="flex flex-wrap gap-1">
                  <For each={colors()}>{(color) => <p style={{ color }}>On</p>}</For>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]">
        <div>Milestone</div>
      </div>
      <Votations title={title()} />
    </div>
  );
}
