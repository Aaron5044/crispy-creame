'use client';
import { Button, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import styles from '../checkoutcomplete/styles/complete.module.css';


export default function CheckoutCompletePage() {
  const router = useRouter();

  const goHome = () => {
    router.push("/customer"); // Redirect to the home page
  };

  return (
    <div className={styles.cartContainer}>
      <Typography variant="h4" sx={{ textAlign: 'center', paddingTop: 4 }}>
        CHECKOUT COMPLETE!
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', paddingTop: 2 }}>
        Thank you for your purchase. Your order is being processed.
      </Typography>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={goHome}
          sx={{ padding: '10px 20px', fontWeight: 'bold' }}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
