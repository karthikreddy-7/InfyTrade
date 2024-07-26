import React from "react";
import logo from "../assests/logo.png";
import store_logos from "../assests/store_logos.png";


const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
       <div style={styles.brand}>
         <div style={{display : "inline-block"}}> <img src={logo} alt="InfyTrade Logo" style={styles.logo} />
        <p style={styles.team}>Team Infy</p></div>
         <div style={{display : "inline-block"}}><p style={styles.tagline}>
            Maximize your investment in the capital market world with the
            convenience and various features provided by InfyTrade.
          </p></div>
         
          <div style={styles.badges}>
            <img src={store_logos} alt="Stores" style={styles.store_logos} />
            </div> 
         
        </div>
        <div style={styles.linksContainer}>
          <div style={styles.linksColumn}>
            <h4 style={styles.columnTitle}>Companies</h4>
            <a href="/about" style={styles.link}>About Us</a>
            <a href="/journey" style={styles.link}>Journey</a>
            <a href="/blog" style={styles.link}>Blog</a>
            <a href="/contact" style={styles.link}>Contact</a>
            <a href="/help" style={styles.link}>Help</a>
          </div>
          <div style={styles.linksColumn}>
            <h4 style={styles.columnTitle}>Resources</h4>
            <a href="/about" style={styles.link}>About Us</a>
            <a href="/journey" style={styles.link}>Journey</a>
            <a href="/blog" style={styles.link}>Blog</a>
            <a href="/contact" style={styles.link}>Contact</a>
            <a href="/help" style={styles.link}>Help</a>
          </div>
          <div style={styles.linksColumn}>
            <h4 style={styles.columnTitle}>Help</h4>
            <a href="/house-rules" style={styles.link}>House Rules</a>
            <a href="/terms" style={styles.link}>Our Terms</a>
            <a href="/privacy" style={styles.link}>Privacy & Policy</a>
          </div>
          <div style={styles.contactColumn}>
            <h4 style={styles.columnTitle}>Contact Us</h4>
            <p style={styles.contactInfo}>+00 00000000</p>
            <p style={styles.contactInfo}>Area 51, unknown</p>
            <p style={styles.contactInfo}>johndoe@yahoo.com</p>
          </div>
        </div>
      </div>
      <div style={styles.copyright}>
        <p>Copyright © InfyTrade 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#F0F4F8",
    paddingbottom : '0px',
    borderTop: "1px solid #e7e7e7",
    position: "relative",
    bottom: "0",
    width: "100%",
  },
  container: {
    
    width : '100%',
    paddingbottom: "0",
  },
  brand: {
    display: "flex",
    minWidth: "100%",
    marginBottom: "20px",
    justifyContent : "space-between"
  },
  logo: {
    height: "50px",
    display : "inline-block"
  },
  tagline: {
    margin: "10px 0",
    color: "#666",
    display : "inline-block"
  },
  team: {
    margin: "10px 0",
    fontWeight: "bold",
    display : "inline-block"
  },
  badges: {
    display: "flex",
    gap: "10px",
    display : "inline-block"
  },
  badge: {
    height: "40px",
    width: "120px",
  },
  linksContainer: {
    display: "flex",
    flex: "2",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  linksColumn: {
    minWidth: "150px",
    marginBottom: "20px",
  },
  contactColumn: {
    minWidth: "150px",
    marginBottom: "20px",
  },
  columnTitle: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  link: {
    display: "block",
    color: "#333",
    textDecoration: "none",
    marginBottom: "5px",
  },
  contactInfo: {
    color: "#666",
    marginBottom: "5px",
  },
  copyright: {
    textAlign: "center",
    padding: "10px 0",
    borderTop: "1px solid #e7e7e7",
    backgroundColor: "#F0F4F8",
    marginTop: "20px",
  },

  store_logos:{
   height:"100px",
   width:"100px",
   
  },
};

export default Footer;
