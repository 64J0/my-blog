import axios from "axios";
import cheerio from "cheerio";

const url = "https://github.com/64J0";

export async function getGithubData(): Promise<string | null> {
  return axios
    .get(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const contribChart = $(".js-calendar-graph");
      return contribChart.html();
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}