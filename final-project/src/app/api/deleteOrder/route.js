const { MongoClient, ObjectId } = require('mongodb');

// MongoDB Atlas connection URI
const uri = "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB"; // Replace with your connection URI

// Function to delete an order
async function deleteOrder(orderId) {
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const database = client.db("KK_DB"); // Replace with your database name
        const ordersCollection = database.collection("ORDERS"); // Replace with your collection name

        // Delete the order by ID
        const result = await ordersCollection.deleteOne({ _id: new ObjectId(orderId) });

        if (result.deletedCount === 0) {
            console.log("Order not found");
            return { status: 404, message: "Order not found" };
        }

        console.log("Order deleted successfully");
        return { status: 200, message: "Order deleted successfully" };
    } catch (error) {
        console.error("Error deleting order:", error);
        return { status: 500, message: "Internal server error" };
    } finally {
        await client.close();
    }
}

