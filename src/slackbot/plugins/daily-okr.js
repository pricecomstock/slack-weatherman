import cron from "node-cron";
import { getChannel } from "../slack-utils";
import WeathermanDAO from "../../server/dao";
import { ShuffleRandomizer } from "../utils/random-utils";

const CHANNEL_NAME = "dt_corporate";
const OKR_LIST = [
  "Protect Brand Reputation & Excel in Operational Excellence",
  "Table stakes",
  "Highly available & secure environment",
  "True metrics/data/agile metrics",
  "Product thinking, business metrics, scorecards",
  "Customer survey scores",
  "Modern Tech Org & Operations Model",
  "Agile, fast service delivery, data driven",
  "Pervasive MVP thinking",
  "Talent that can adjust to changing demands from our customers",
  "Expand ecosystem plug & play architecture",
  "Build scalable platforms that can inspire new lines of business",
  "Disruptive Tech Adoption",
  "Exploration & experimentation - chances to impact the business",
  "Hack mentality, MVP thinking",
  "What can we do in 90 days",
  'True innovation - not just "lipstick on a pig"',
  "Value Creation & Competitive Advantage",
  "Topline growth enablement",
  "Business led; Tech enabled",
  "New business models",
  "Bottom-line efficiencies. We are very good with this. Don't lose this capability",
  "Trusted Advisors to Board & Business",
  "2 in a box",
  "Let's have fun",
  "Celebrate wins, and more so, also celebrate failures (best lessons learned)",
];

const INSPIRATION_LIST = [
  "Go get 'em DT!",
  "Let's show that we really are the Dream Team today!",
  "Have a GREAT day, DT!",
  "Make today a little better than yesterday!",
  "Have an excellent day!",
  "Have a good day!",
  "Have an amazing day!",
  "Have a wonderful day!",
  "Have an awesome day of work!",
  "Make today the best day yet!",
  "Enjoy your day, DT!",
  "You can do it!",
  "We got this!",
  "Dream Team, Dream Team, Dream Team!",
  "Keep doing what you're doing, Dream Team!",
  "Remember, we're all counting on each other!",
];

const EMOJI_LIST = [
  "🤝",
  "📈",
  "💪",
  "🙌🏻🙌🏽🙌🏿",
  "👍",
  "🙂",
  "🕶",
  "🚀",
  "🏆",
  "🎯",
  "💡",
  "🛠",
  "🔥",
  "⭐️",
  "🌟",
  "✨",
  "⚡️",
  "☀️",
  "🧑‍💻",
  "👩‍🔧",
  "🏃",
];

const okrRandomizer = new ShuffleRandomizer(OKR_LIST);
const inspirationRandomizer = new ShuffleRandomizer(INSPIRATION_LIST);
const emojiRandomizer = new ShuffleRandomizer(EMOJI_LIST);

export default {
  name: "wordle",
  install: async ({ rtm, token }) => {
    const dtCorporateChannelId = "G6Q982D7Y";
    cron.schedule(
      "55 8 * * 1-5",
      () => {
        WeathermanDAO.log(`Posting daily OKR`);
        rtm.sendMessage(
          `🥇Today's OKR🥇\n\n> *${okrRandomizer.pick()}*\n\n${inspirationRandomizer.pick()} ${emojiRandomizer.pick()}`,
          dtCorporateChannelId
        );
      },
      {
        timezone: "America/Chicago",
      }
    );
  },
};
