import Link from 'next/link';

export default function Navbar() {
    return (
        <div style={styles.navbarContainer}>
            <div style={styles.navbar}>
                <h1 style={styles.logo}>Krispy Kreme</h1>
                <div style={styles.navLinks}>
                    <Link href="/customer" style={styles.link}>HOME</Link>
                    <Link href="/view_cart" style={styles.link}>CART</Link>
                    <Link href="/mainLogin" style={styles.link}>LOGIN / REGISTER</Link>
                   
                </div>
            </div>
        </div>
    );
}

const styles = {
    navbarContainer: {
        width: '100%',
        position: 'fixed', // Make the navbar fixed at the top
        top: '0',
        left: '0',
        backgroundColor: '#171717', // Darker color for the navbar
        zIndex: '1000', // Ensure it's above other content
        padding: '10px 20px',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between', // Space out the logo and links
        alignItems: 'center',
    },
    logo: {
        fontFamily: 'Cursive, sans-serif',
        fontWeight: 'bold',
        fontSize: '30px',
        color: 'white',
    },
    navLinks: {
        display: 'flex',
        gap: '20px', // Add space between links
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        transition: 'color 0.3s', // Add transition for smooth color change
        fontWeight: 'bold'
    },
    linkHover: {
        color: '#A9005B', // Dark pink color on hover
    }
};
