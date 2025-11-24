export default function LoginPage() {
  return (
    <main>
      <h1>Login</h1>

      <form>
        <div>
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" required />
        </div>
    <div>
          <label htmlFor="password">Password:</label><br />
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit">
          Login
        </button>
      </form>

    </main>
  );
}
