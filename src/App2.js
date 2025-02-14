import React from "react";

const ContactUs = () => {
  const styles = {
    container: {
      backgroundColor: "#1a202c",
      minHeight: "100vh",
      color: "#f7fafc",
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      flexDirection: "column",
      padding: "16px",
    },
    header: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      padding:"2rem 0rem"
    },
    form: {
      backgroundColor: "#2d3748",
      padding: "16px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      height:"calc(100vh - 32px)"
    },
    inputGroup: {
      marginBottom: "1.5rem",
    },
    label: {
      display: "block",
      marginBottom: "0.5rem",
      fontSize: "1rem",
      color: "#e2e8f0",
    },
    input: {
      width: "calc(100% - 32px)",
      padding: "0.75rem 1rem",
      borderRadius: "4px",
      border: "1px solid #4a5568",
      backgroundColor: "#1a202c",
      color: "#e2e8f0",
      fontSize: "1rem",
    },
    textarea: {
      width: "calc(100% - 32px)",
      height: "150px",
      padding: "0.75rem 1rem",
      borderRadius: "4px",
      border: "1px solid #4a5568",
      backgroundColor: "#1a202c",
      color: "#e2e8f0",
      fontSize: "1rem",
      resize: "none",
    },
    button: {
      padding: "0.75rem 1.5rem",
      borderRadius: "5px",
      backgroundColor: "#47c2be",
      color: "#1a202c",
      fontSize: "1rem",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#38a89d",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Contact Us</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="name">
            Name
          </label>
          <input
            style={styles.input}
            type="text"
            id="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="email">
            Email
          </label>
          <input
            style={styles.input}
            type="email"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="subject">
            Subject
          </label>
          <input
            style={styles.input}
            type="text"
            id="subject"
            placeholder="Enter the subject"
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="message">
            Message
          </label>
          <textarea
            style={styles.textarea}
            id="message"
            placeholder="Write your message here"
            required
          ></textarea>
        </div>
        <button
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
