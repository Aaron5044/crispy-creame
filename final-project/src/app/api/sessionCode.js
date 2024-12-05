import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export async function getCustomSession() {
  const cookieStore = await cookies(); // Await the cookies() function
  const session = await getIronSession(cookieStore, {
    password: "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf", // Secure password
    cookieName: "app",
  });
  return session;
}
