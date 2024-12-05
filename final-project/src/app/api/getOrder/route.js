const { MongoClient } = require("mongodb");

export async function GET(req) {
    console.log("In the API page for fetching orders");

    const url = "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB";
    const client = new MongoClient(url, { serverSelectionTimeoutMS: 30000 });
    const dbName = "KK_DB";

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected successfully to MongoDB server");

        // Access the collection
        const db = client.db(dbName);
        const collection = db.collection("ORDERS");

        // Fetch orders from the collection
        const orders = await collection.find({}).toArray();
        console.log("Fetched orders:", orders);

        return new Response(JSON.stringify(orders), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Error occurred:", err.message);
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        await client.close();
    }
}
