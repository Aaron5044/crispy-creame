// Layout.js (in the appropriate directory)
import { CartProvider } from "./components/CartContext";
import Navbar from "./components/Navbar";
import CartPage from "./components/shoppingCart/cartPage"; // Adjust the path if needed

export default function Layout({ children }) {
  return (
    <CartProvider>  {/* Ensure CartProvider is wrapping the components */}
      <Navbar />
      <CartPage />   {/* Render CartPage here */}
      {children}    {/* Render any other child components */}
    </CartProvider>
  );
}
