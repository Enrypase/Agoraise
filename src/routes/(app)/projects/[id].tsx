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
  state: "active",
};

export default function Project() {
  const data = fullMoc;
  return (
    <div class="grid grid-cols-[auto,max(min(30rem,33vw),500px)] gap-10">
      <div class="flex flex-col gap-2 p-5">
        <div class="grid grid-cols-3">
          <div>
            <p>Total users</p>
            <h4>10.555</h4>
          </div>
          <div class="flex flex-col">
            <div>
              <p>Total Donations</p>
              <h4>$5002</h4>
            </div>
            <div>
              <p>Total Votations</p>
              <h4>02</h4>
            </div>
            <div class="flex justify-between">
              <p>Project Type</p>
              <small>Charity</small>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h4>Active Votations:</h4>
            <div class="flex flex-col gap-1">
              <div class="flex justify-between">
                <div class="flex gap-1">
                  <p>Name</p>
                  <p>Img</p>
                </div>
                <button class="rounded-full bg-main px-2 py-1 text-white">Vote</button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full rounded-xl p-5 shadow-xl">
          <h4>About This Project</h4>
          <p>Descr</p>
        </div>
        <div class="flex w-full flex-col gap-3 rounded-xl p-5 shadow-xl">
          <h4>Interact With {data.metadata.title}</h4>
          <p>Descr 2</p>
          <div class="grid grid-cols-2">
            <div class="flex flex-col gap-2 p-5 shadow-xl">
              <h4>Title</h4>
              <p>Descr</p>
            </div>
            <div class="flex flex-col gap-2 p-5 shadow-xl">
              <h4>Title</h4>
              <p>Descr</p>
            </div>
          </div>
          <button class="w-full rounded-xl bg-main px-2 py-1 text-center text-white">Need Help?</button>
        </div>
      </div>
      <div class="flex flex-col gap-10 p-5">
        <div class="overflow-hidden rounded-xl shadow-xl">
          <div class="h-32 w-full bg-black" />
          <div class="relative flex flex-col gap-5 p-10">
            <div class="absolute left-10 top-0 size-16 -translate-y-1/2 rounded-full bg-main" />
            <h4>{data.metadata.title}</h4>
            <div class="flex gap-2">
              <p class="rounded-xl bg-blue-200 px-2 py-1 text-blue-700">TAG 1</p>
              <p class="rounded-xl bg-blue-200 px-2 py-1 text-blue-700">TAG 2</p>
            </div>
            <div class="flex items-center gap-2">
              <p>Community</p>
              <div class="flex gap-1">
                <div class="size-10 rounded-full bg-main" /> <div class="size-10 rounded-full bg-main" />
                <div class="size-10 rounded-full bg-main" /> <div class="size-10 rounded-full bg-main" />
              </div>
            </div>
            <div class="flex flex-col gap-2">
              <p>Official Links</p>
              <div class="flex gap-1">
                <p class="rounded-xl bg-green-200 px-2 py-1 text-green-700">LINK 1</p>
                <p class="rounded-xl bg-green-200 px-2 py-1 text-green-700">Link 2</p>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow-hidden rounded-xl p-10 shadow-xl">
          <h4>Funding</h4>
          <div class="flex items-center justify-center">
            <div class="size-64 rounded-full bg-main" />
          </div>
        </div>
      </div>
    </div>
  );
}
