"use client"; 
export default function LoginPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Login</h1>
      <p>Access your motorcycle assistance account here.</p>
      <form>
        <div>
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" required />
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Login
        </button>
      </form>
    </main>
  );
}
