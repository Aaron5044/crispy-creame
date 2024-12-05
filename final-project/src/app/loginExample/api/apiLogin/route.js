import { MongoClient } from "mongodb";
import { getCustomSession } from "../../../api/sessionCode";

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ data: "missing_parameters" }),
        { status: 400 }
      );
    }

    console.log("Email:", email);
    console.log("Password:", password);

    const url = "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB";
    const client = new MongoClient(url);
    const dbName = "KK_DB";

    await client.connect();
    console.log("Connected successfully to server");

    const db = client.db(dbName);
    const collection = db.collection("register");

    // Check if the email exists
    const user = await collection.findOne({ email });

    if (!user) {
      console.log("Email not found");
      return new Response(
        JSON.stringify({ data: "invalid_email" }),
        { status: 401 }
      );
    }

    // Verify password
    if (user.password === password) {
      console.log("Login valid");

      // Start a session
      const session = await getCustomSession();
      session.email = user.email;
      session.role = user.role || "customer";  // Default to 'customer' if no role is found
      await session.save();

      console.log("Session started");

      // Send the role and login status in the response
      return new Response(
        JSON.stringify({ data: "valid", role: session.role }),
        { status: 200 }
      );
    } else {
      console.log("Invalid password");
      return new Response(
        JSON.stringify({ data: "invalid_password" }),
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({
        data: "error",
        message: "Server error. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
