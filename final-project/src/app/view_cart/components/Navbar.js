'use client';

import { useState } from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Drawer, Box } from '@mui/material';
import styles from '../styles/navbarStyles';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div style={styles.navbarContainer}>
      <div style={styles.navbar}>
        <div style={styles.leftSection}>
          <IconButton onClick={toggleMenu} style={styles.menuButton}>
            <MenuIcon style={{ color: 'white', fontSize: '30px' }} />
          </IconButton>
          <h1 style={styles.logo}>Krispy Kreme</h1>
        </div>

        <div style={styles.navLinks}>
      
          <Link href="/customer" style={styles.link}>
            HOME
          </Link>
          <Link href="/view_cart" style={styles.link}>
            CART
          </Link>
          <Link href="/mainLogin" style={styles.link}>
            LOGIN / REGISTER
          </Link>

        </div>
      </div>

      {/* Drawer for mobile menu */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleMenu}>
        <Box style={styles.drawerContent}>

          <Link href="/customer" onClick={toggleMenu} style={styles.drawerLink}>
            HOME
          </Link>
          <Link href="/view_cart" onClick={toggleMenu} style={styles.drawerLink}>
            CART
          </Link>
          <Link href="/mainLogin" onClick={toggleMenu} style={styles.drawerLink}>
            LOGIN / REGISTER
          </Link>
        </Box>
      </Drawer>
    </div>
  );
}
