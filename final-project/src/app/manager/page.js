'use client';
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import { Logout as LogoutIcon, Delete as DeleteIcon } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ManagerPage() {
  const [selectedPage, setSelectedPage] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch orders
    fetch("../api/getOrder")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));

    // Fetch products
    fetch("../api/getProducts")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/deleteOrder/${orderId}`, { method: "DELETE" });
      if (response.ok) {
        alert("Order deleted successfully!");
        setOrders(orders.filter((order) => order._id !== orderId));
      } else {
        alert("Error deleting order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/deleteProduct/${productId}`, { method: "DELETE" });
      if (response.ok) {
        alert("Product deleted successfully!");
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        alert("Error deleting product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div style={{ background: "linear-gradient(to right, black 50%, #ff4081 50%)", minHeight: "100vh" }}>
      <AppBar position="fixed" sx={{ background: "linear-gradient(to right, black 50%, #ff4081 50%)" }}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", fontFamily: "'Pacifico', cursive", color: "white", marginRight: "20px" }}
          >
            KRISPYKREME
          </Typography>
          <Box sx={{ display: "flex", flexGrow: 1 }}>
            <Button
              onClick={() => setSelectedPage("orders")}
              sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase", marginRight: "10px" }}
            >
              Orders
            </Button>
            <Button
              onClick={() => setSelectedPage("dashboard")}
              sx={{ color: "white", fontWeight: "bold", textTransform: "uppercase" }}
            >
              Dashboard
            </Button>
          </Box>
          {isLoggedIn ? (
            <>
              <IconButton
                onClick={() => {
                  sessionStorage.removeItem("user");
                  setIsLoggedIn(false);
                  router.push("/loginExample");
                }}
                sx={{ color: "white" }}
              >
                <LogoutIcon />
                Logout
              </IconButton>
            </>
          ) : null}

        </Toolbar>
      </AppBar>

      <Container sx={{ paddingTop: "80px" }}>
        {/* Orders Section */}
        {selectedPage === "orders" && (
          <div>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              All Orders
            </Typography>
            <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
              {orders.map((order, index) => (
                <Card
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    padding: "15px",
                  }}
                >
                  {/* First Section: List Products Vertically */}
                  <Box sx={{ flexBasis: "50%", overflowY: "auto", maxHeight: "200px" }}>
                    {order.items.map((item, idx) => (
                      <Typography
                        key={idx}
                        variant="body1"
                        sx={{ fontWeight: "bold", marginBottom: "5px" }}
                      >
                        {idx + 1}. {item.PROD_NAME} - ${item.PROD_PRICE}
                      </Typography>
                    ))}
                  </Box>

                  {/* Second Section: Order Details */}
                  <Box sx={{ flexBasis: "50%", paddingLeft: "20px" }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Name: {order.cardholder}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Email: {order.email}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Quantity: {order.items.length}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Shipping Fee: ${order.shippingFee}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      Total: ${order.total}
                    </Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          </div>
        )}

        {/* Dashboard Section */}
        {/* Dashboard Section */}
        {selectedPage === "dashboard" && (
          <div>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
              Product Dashboard
            </Typography>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <Card>
                    {/* Product Image */}
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.PROD_IMG} // Make sure this is the correct field for product image
                      alt={product.PROD_NAME}
                    />
                    <CardContent>
                      <Typography variant="h6">{product.PROD_NAME}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ marginTop: "10px" }}>
                      {product.PROD_DESCRIP} {/* Add product description here */}
                      </Typography>
                      <Typography variant="body2">Price: ${product.PROD_PRICE}</Typography>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteProduct(product._id)}
                        sx={{ marginTop: "10px" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        )}

      </Container>
    </div>
  );
}
