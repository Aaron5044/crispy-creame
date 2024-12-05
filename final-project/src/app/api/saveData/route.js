import { getCustomSession } from '../sessionCode';

export async function GET(req, res) {
  let session = await getCustomSession();

  // Save some data to the session
  session.role = 'customer'; // Set role
  session.email = 'mymail@mail.com'; // Set email

  // Save the session data
  await session.save();

  console.log("data saved");

  // Return a response (could be JSON or just an empty object)
  return Response.json({});
}
