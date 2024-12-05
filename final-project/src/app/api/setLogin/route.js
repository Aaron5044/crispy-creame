import { MongoClient } from 'mongodb';

export async function POST(req) {
  console.log("In the API page");

  // Parse the JSON body from the request
  const { email, password } = await req.json();  // Destructure email and pass from JSON body
  console.log("Email:", email);
  console.log("Password:", password);

  const url = 'mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB';
  const client = new MongoClient(url);
  const dbName = 'KK_DB';

  try {
    await client.connect();
    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection('register'); // Updated collection name

    // Step 1: Check if the email exists
    const user = await collection.findOne({ "email": email });

    if (!user) {
      console.log("Email not found");
      return new Response(JSON.stringify({ data: "invalid_email" }), { status: 401 });
    }

    // Step 2: Verify password (plain text comparison)
    if (user.password === password) {  // Assuming the password field is 'password'
      console.log("Login valid");
      return new Response(JSON.stringify({ data: "valid", role: user.role || "customer" }), { status: 200 });
    } else {
      console.log("Invalid password");
      return new Response(JSON.stringify({ data: "invalid_password" }), { status: 401 });
    }
  } catch (error) {
    console.error("Database error:", error);
    return new Response(JSON.stringify({ data: "error", message: "Server error. Please try again later." }), { status: 500 });
  } finally {
    await client.close();
  }
}
