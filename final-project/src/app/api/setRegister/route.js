const { MongoClient } = require("mongodb"); // Import MongoClient from mongodb package to interact with MongoDB

// Define the GET handler function that processes incoming requests
export async function GET(req) {
    console.log("In the API page for adding a new registration");

    // MongoDB connection URL
    const url = "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB";
    
    // Create a new MongoClient instance to connect to MongoDB
    const client = new MongoClient(url, { serverSelectionTimeoutMS: 30000 });

    // Database name
    const dbName = "KK_DB";

    try {
        // Extract query parameters (email, password, username, role) from the incoming request URL
        const { searchParams } = new URL(req.url);
        const email = searchParams.get('email');
        const pass = searchParams.get('password');
        const username = searchParams.get('username');
        const role = searchParams.get('role'); // Extract the role value

        // Log the received data for debugging
        console.log("Received data:", { username, email, pass, role });

        // Connect to MongoDB database
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        // Access the specific database and collection
        const db = client.db(dbName);
        const collection = db.collection("register");

        // Insert the new user into the 'register' collection, including their role
        const result = await collection.insertOne({ username, email, password: pass, role });
        console.log("Document inserted:", result);

        // Send a success response to the client
        return new Response(JSON.stringify({ success: true, message: "User registered successfully!" }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        // Log the error message if an error occurs
        console.error("Error occurred:", err.message);

        // Send an error response to the client if something goes wrong
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500, // Status 500 indicates a server error
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        // Ensure the MongoDB client is closed after the operation
        await client.close();
    }
}
