import { useSearchParams } from "@solidjs/router";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";
import Form, { Input } from "~/libs/form";
import Project from "../projects/[id]";
import DropZone from "~/libs/DropZone";
import axios from "axios";
import { BASE_URL } from "~/libs/variables";

const [store, setStore] = createStore({
  title: "",
  tags: [""],
  mainDescription: "",
  type: "",
  socials: [""],
  mainPaymentsDescription: "",
  sm: "No" as "Yes" | "No",
  socialsTitle: "",
  socialsDescription: "",
  paymentsTitle: "",
  paymentsDescription: "",
  mainImage: "",
  logoImage: "",
});
export default function Create() {
  const [searchParams, setSearchParams] = useSearchParams();
  async function submitData(data: FormData) {
    console.log("pushing ", data);
    const res = await axios.post(`${BASE_URL}/api/v0/projects`, data);
    console.log(res);
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
            asyncSuccessCallback={(data) => submitData(data as FormData)}
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
                  fn={(tags) => setStore({ tags: tags.split(" ") })}
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
              fn={(socials) => setStore({ socials: socials.split(" ") })}
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
