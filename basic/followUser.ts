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

async function getProfileDID() {
  // Login
  await agent.login({
    identifier: user,
    password: pass,
  });

  // Gets the first 50 follows of a user
  let response = await agent.follow("did:plc:3rmsw4hpaqvxw632tfnek2rw");

  console.log(response);
}

getProfileDID();
