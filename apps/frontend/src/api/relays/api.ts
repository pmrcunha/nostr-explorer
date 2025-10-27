import { BASE_URL } from "../constants";

export async function listRelays() {
  const response = await fetch(`${BASE_URL}/relays`);
  if (response.ok) {
    const json = await response.json();
    return json;
  } else {
    throw Error("Bad relays");
  }
}
