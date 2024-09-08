import { useSearchParams } from "@solidjs/router";
import { For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Form, { Input } from "~/libs/form";
import Project from "../projects/[id]";
import DropZone from "~/libs/DropZone";
import axios from "axios";
import { BASE_URL } from "~/libs/variables";
import { useClientSession } from "~/hooks/sessionHooks";

type MilestoneType = {
  endDate: number;
  amount: number;
};
const [store, setStore] = createStore({
  title: "",
  tags: "",
  mainDescription: "",
  type: "",
  socials: "",
  mainPaymentsDescription: "",
  sm: "No" as "Yes" | "No",
  socialsTitle: "",
  socialsDescription: "",
  paymentsTitle: "",
  paymentsDescription: "",
  mainImage: "",
  logoImage: "",
  milestones: [] as MilestoneType[],
});
export default function Create() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { wallet } = useClientSession();

  async function submitData(data: FormData) {
    if (wallet()?.selectedAddress) data.set("owner", wallet()!.selectedAddress!);
    await axios.post(`${BASE_URL}/api/v0/projects`, data);
  }
  return (
    <div class="flex items-center justify-center">
      <div class="h-[85dvh] w-[85vw] overflow-auto rounded-xl p-5 shadow-xl">
        <Show
          when={searchParams.preview !== "true"}
          fallback={
            <div class="">
              <button
                class="relative z-10 rounded-xl bg-red px-6 py-2 text-white"
                onClick={() => setSearchParams({ preview: null })}
              >
                <p>Close</p>
              </button>
              <Project {...store} />
            </div>
          }
        >
          <h1>Create A New Fundraise Campaign</h1>
          <Form
            class="flex flex-col gap-5"
            asyncSuccessCallback={(data) => {
              return submitData(data as FormData);
            }}
            returnFormData={true}
          >
            <div class="flex gap-5">
              <DropZone
                type="image"
                name="mainImage"
                multiple={false}
                previewCallback={(mainImage) => setStore({ mainImage: mainImage[0] })}
              >
                <Show
                  when={store.mainImage}
                  fallback={
                    <div class="flex size-32 items-center justify-center rounded-xl bg-main p-5 text-center text-white">
                      <p>Drop Main Image</p>
                    </div>
                  }
                >
                  <img src={store.mainImage} class="size-32" alt="Main" />
                </Show>
              </DropZone>
              <DropZone
                type="image"
                name="logoImage"
                multiple={false}
                previewCallback={(logoImage) => setStore({ logoImage: logoImage[0] })}
              >
                <Show
                  when={store.logoImage}
                  fallback={
                    <div class="flex size-32 items-center justify-center rounded-xl bg-main p-5 text-center text-white">
                      <p>Drop Logo Image</p>
                    </div>
                  }
                >
                  <img src={store.logoImage} class="size-32" alt="Main" />
                </Show>
              </DropZone>
            </div>
            <div class="flex gap-5">
              <div>
                <Input fn={(title) => setStore({ title })} name="title" title="Title" type="text" value={store.title} />
                <Input
                  fn={(tags) => setStore({ tags })}
                  name="tags"
                  title="Insert a list of tags separated by a space"
                  type="text"
                  value={store.tags}
                />
              </div>
              <div class="grow">
                <Input
                  fn={(mainDescription) => setStore({ mainDescription })}
                  name="mainDescription"
                  title="What's this fundraise about"
                  type="textarea"
                  value={store.mainDescription}
                />
              </div>
            </div>
            <Input
              fn={(type) => setStore({ type })}
              name="type"
              type="multiple"
              title="What's the type of your project?"
              options={[
                { text: "Charity", value: "Charity" },
                { text: "Fund Your Idea", value: "Fund Your Idea" },
              ]}
              value={store.type}
            />
            <Input
              fn={(socials) => setStore({ socials })}
              name="socials"
              title="Insert your socials separated by a space"
              type="text"
              value={store.socials}
            />
            <Input
              fn={(mainPaymentsDescription) => setStore({ mainPaymentsDescription })}
              name="mainPaymentsDescription"
              title="Main Payments Description"
              type="textarea"
              value={store.mainPaymentsDescription}
            />
            <Input
              fn={(sm) => setStore({ sm: sm as "Yes" | "No" })}
              name="sm"
              type="boolean"
              title="Should you allow social media followers to interact with the project?"
              options={[
                {
                  text: "Yes",
                  value: "Yes",
                },
                { text: "No", value: "No" },
              ]}
              value={store.sm}
            />
            <Input
              fn={(socialsTitle) => setStore({ socialsTitle })}
              name="socialsTitle"
              title="Social Title"
              type="text"
              value={store.socialsTitle}
            />
            <Input
              fn={(socialsDescription) => setStore({ socialsDescription })}
              name="socialsDescription"
              title="Social Description"
              type="textarea"
              value={store.socialsDescription}
            />
            <Input
              fn={(paymentsTitle) => setStore({ paymentsTitle })}
              name="paymentsTitle"
              title="Payments Title"
              type="text"
              value={store.paymentsTitle}
            />
            <Input
              fn={(paymentsDescription) => setStore({ paymentsDescription })}
              name="paymetsDescription"
              title="Payments Description"
              type="textarea"
              value={store.paymentsDescription}
            />
            <h4>Milestones:</h4>
            <div class="flex flex-wrap gap-5">
              <For each={store.milestones}>
                {(m, i) => (
                  <div class="relative">
                    <button
                      type="button"
                      class="absolute right-0 top-0 size-6 rounded-full bg-red text-white"
                      onClick={() =>
                        setStore({
                          milestones: store.milestones.filter((el) => JSON.stringify(el) !== JSON.stringify(m)),
                        })
                      }
                    >
                      <p>X</p>
                    </button>
                    <div class="flex gap-2">
                      <input
                        class="rounded-xl border-2 border-solid border-main px-8 py-2"
                        type="date"
                        name="milestoneEndDate"
                        value={new Date(m.endDate).toISOString().split("T")[0]}
                        min={new Date().toISOString().split("T")[0]}
                        onBlur={(e) => {
                          const newMilestones = [...store.milestones];
                          newMilestones[i()] = { ...m, endDate: new Date(e.target.value).getTime() / 1000 };
                          setStore({ milestones: newMilestones });
                          console.log(newMilestones);
                        }}
                      />
                      <input
                        class="rounded-xl border-2 border-solid border-main px-8 py-2"
                        type="number"
                        name="milestoneAmount"
                        value={m.amount}
                        onBlur={(e) => {
                          const newMilestones = [...store.milestones];
                          newMilestones[i()] = { ...m, amount: parseInt(e.target.value) };
                          setStore({ milestones: newMilestones });
                        }}
                      />
                    </div>
                  </div>
                )}
              </For>
              <button
                type="button"
                class="rounded-xl bg-main px-6 py-2 text-white"
                onClick={() => {
                  setStore({ milestones: [...store.milestones, { endDate: 0, amount: 0 }] });
                }}
              >
                <p>Add Milestone!</p>
              </button>
            </div>
            <div class="flex gap-5 py-5">
              <button
                class="w-full rounded-xl bg-blue py-2 text-white"
                type="button"
                onClick={() => setSearchParams({ preview: "true" })}
              >
                <p>Preview</p>
              </button>
              <Input type="submit" name="Submit!" />
            </div>
          </Form>
        </Show>
      </div>
    </div>
  );
}
