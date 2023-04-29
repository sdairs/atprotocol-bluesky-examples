import { BskyAgent } from "@atproto/api";
import dotenv from "dotenv";

dotenv.config();

const user: string = process.env.ATP_USER ?? "";
const pass: string = process.env.ATP_PASS ?? "";

console.log(user);

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

  // Gets a users profile
  const profile = await agent.getProfile({ actor: user });

  console.log(profile.data.did);
}

getProfileDID();
