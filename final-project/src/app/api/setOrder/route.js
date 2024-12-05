const { MongoClient } = require("mongodb");
const nodemailer = require("nodemailer");

export async function POST(req) {
    console.log("In the API page for placing a new order");

    const url = "mongodb+srv://KK_DB:pass@kkdb.hwqqo.mongodb.net/?retryWrites=true&w=majority&appName=KKDB";
    const client = new MongoClient(url, { serverSelectionTimeoutMS: 30000 });
    const dbName = "KK_DB";

    try {
        const orderDetails = await req.json();
        console.log("Received order data:", orderDetails);

        await client.connect();
        console.log("Connected successfully to MongoDB server");

        const db = client.db(dbName);
        const collection = db.collection("ORDERS");

        const result = await collection.insertOne(orderDetails);
        console.log("Order inserted:", result);

        await sendConfirmationEmail(orderDetails);

        return new Response(JSON.stringify({ success: true, message: "Order placed successfully!" }), {
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




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function sendConfirmationEmail(orderDetails) {
    const { email, items, subtotal, shippingFee, total } = orderDetails;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "Ameeshbainsraj2727@gmail.com",  // Your email
            pass: "Aa2272003@",  // Your email password
        },
    });

    const mailOptions = {
        from: "Ameeshbainsraj2727@gmail.com",  // Your email
        to: email,
        subject: "Your Order Confirmation",
        text: `Thank you for your order! Here are the details:\n\n
               Items: ${items.map(item => `${item.PROD_NAME} x${item.quantity}`).join('\n')}\n
               Subtotal: $${subtotal.toFixed(2)}\n
               Shipping Fee: $${shippingFee.toFixed(2)}\n
               Total: $${total.toFixed(2)}\n`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", email);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
