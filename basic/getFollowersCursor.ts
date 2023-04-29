import { BskyAgent } from "@atproto/api";
import dotenv from "dotenv";

dotenv.config();

const user: string = process.env.ATP_USER ?? "";
const pass: string = process.env.ATP_PASS ?? "";

if (user == "" || pass == "") process.exit();

const agent = new BskyAgent({
  service: "https://bsky.social",
  persistSession: (evt, sess) => {},
});

async function getFollowersCursor() {
  // Login
  await agent.login({
    identifier: user,
    password: pass,
  });

  let cursor: string | undefined = undefined;
  while (true) {
    // Be careful, this will loop infinitely!
    let response = await agent.getFollowers({
      actor: user,
      limit: 100, // 100 is the max
      cursor: cursor, // if the user has more than 100, we need a cursor to page through them
    });
    console.log(`Getting followers...${response.data.followers.length}`);
    // each request has a unique cusrsor, you must save the new cursor to use in the next request
    cursor = response.data.cursor;
    // this is an artificial sleep so you don't get rate limited during this loop
    await new Promise((f) => setTimeout(f, 1000));
  }
}

getFollowersCursor();
