import { getCustomSession } from "../sessionCode";

export async function GET(req, res) {
  // Retrieve the session
  let session = await getCustomSession();

  // Access session data
  let customersRole = session.role;
  let email = session.email;

  // Log data
  console.log(customersRole);
  console.log(email);

  // Return a response (could be JSON or just an empty object)
  return Response.json({});
}
