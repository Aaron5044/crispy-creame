import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://aaron:<db_password>@cluster0.ngesq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function GET(request) {
  try {
    // Connect to MongoDB and log connection status
    await client.connect();
    console.log("Database connected successfully!");

    const database = client.db("crispy_creame");
    const cartCollection = database.collection("PRODUCT");

    // Fetch all documents from the collection
    const cartItems = await cartCollection.find().toArray();

    return new Response(JSON.stringify(cartItems), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);

    return new Response(
      JSON.stringify({ message: "Error fetching cart items", error: error.message }), 
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close();
  }
}
