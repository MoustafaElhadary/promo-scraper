import puppeteer from "puppeteer";
import hash from "hash.js";
import { NextApiRequest, NextApiResponse } from "next";

const BASE_URL = "https://moments.marriottbonvoy.com";

interface CardData {
  img: string;
  location: string;
  date: string;
  title: string;
  link: string;
  points: string;
  hash: string;
  isDisabled: boolean;
  html: string;
}

async function scrapeWebsite(): Promise<CardData[]> {
  const browser = await puppeteer.launch({ headless: "new" });

  const page = await browser.newPage();
  await page.goto(BASE_URL + "/en-us/moments/collection/368");

  // wait for the content to load
  await page.waitForSelector(".card-wrap");

  const scrapedData = await page.evaluate((BASE_URL) => {
    const cards = Array.from(document.querySelectorAll(".card-wrap")); // convert NodeList to Array
    return cards.map((card) => {
      const img = card.querySelector("img")?.src || "";
      const location = card.querySelector(".label.mb-0-5")?.textContent || "";
      const date =
        card.querySelector(".font-swiss-italic.fz-3xs")?.textContent || "";
      const title =
        card.querySelector(".card-title.font-aldine")?.textContent || "";
      const link = BASE_URL + (card.querySelector("a")?.href || "");

      const pointsElement = card.querySelector(
        ".card-text.font-weight-bold.pt-1.pb-2.mb-auto"
      );
      let points = "";
      if (pointsElement && pointsElement.textContent) {
        const pointsMatch =
          pointsElement.textContent?.match(/(\d+,?\d*)\spoints/);
        points = pointsMatch ? pointsMatch[1] : "";
      }

      const isDisabled = card.classList.contains("disabled");
      const html = card.outerHTML;

      return { img, location, date, title, link, points, isDisabled, html };
    });
  }, BASE_URL); // pass BASE_URL as an argument

  await browser.close();

  // Generate hashes for each card outside the browser context
  const dataWithHashes: CardData[] = scrapedData.map((data) => {
    const hashString = hash
      .sha256()
      .update(
        `${data.img}${data.location}${data.date}${data.title}${data.link}${data.points}`
      )
      .digest("hex");

    return { ...data, hash: hashString };
  });

  return dataWithHashes;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const newData = await scrapeWebsite();
    res.status(200).json({ newData });
  } catch (error) {
    console.log({ error });
  }
}
