import { Margin } from "@mui/icons-material";

const styles = {
    navbarContainer: {
      width: '100%',
      position: 'fixed',
      top: '0',
      left: '0',
      backgroundColor: '#171717',
      zIndex: '1000',
      padding: '10px 20px',
      Margin: '20px'
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    menuButton: {
      cursor: 'pointer',
    },
    logo: {
      fontFamily: 'Cursive, sans-serif',
      fontWeight: 'bold',
      fontSize: '30px',
      color: 'white',
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'color 0.3s',
    },
    drawerContent: {
      width: '250px',
      padding: '20px',
      backgroundColor: '#171717',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    drawerLink: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      transition: 'color 0.3s',
    },
  };
  
  export default styles;
  