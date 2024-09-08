import { APIEvent } from "@solidjs/start/server";
import { pinFileToIPFS } from "~/libs/serverUtils";

export async function POST(event: APIEvent) {
  "use server";
  const data = await event.request.formData();
  console.log(data);
  const mainImage = data.get("mainImage") as File;
  const logoImage = data.get("logoImage") as File;
  console.log(mainImage, logoImage);
  const images = await Promise.all([pinFileToIPFS(mainImage), pinFileToIPFS(logoImage)]);
  console.log(images);
  const fullJSON = {
    mainImage: images[0].IpfsHash,
    logoImage: images[1].IpfsHash,
    title: data.get("title"),
    tags: data.get("tags"),
    mainDescription: data.get("mainDescription"),
    type: data.get("type"),
    socials: data.get("socials"),
    mainPaymentsDescription: data.get("mainPaymentsDescription"),
    sm: data.get("sm"),
    socialsTitle: data.get("socialsTitle"),
    socialsDescription: data.get("socialsDescription"),
    paymentsTitle: data.get("paymentsTitle"),
    paymentsDescription: data.get("paymentsDescription"),
    milestones: data.getAll("milestoneEndDate").map((el, i) => ({
      amount: data.getAll("milestoneAmount")[i],
      endDate: el,
    })),
  };
  const res = await pinFileToIPFS(JSON.stringify(fullJSON));
  console.log(res);
  return new Response();
}
