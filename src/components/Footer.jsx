function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '1rem', marginTop: '2rem', backgroundColor: '#f0f0f0' }}>
      <p>
        See all available API endpoints at{" "}
        <a href="http://localhost:5062/swagger" target="_blank" rel="noopener noreferrer">
          Swagger UI
        </a>
      </p>
    </footer>
  );
}

export default Footer;