import "../assets/styles/registerLogin.css";

function Login() {
    return /*html*/ `
              <form id="login-form">
            <h2>Login</h2>
            <div class="mb-3">
                <label for="login-email" class="form-label">Email</label>
                <input
                    type="text"
                    name="email"
                    id="login-email"
                    placeholder="Enter email"
                    required
                    class="form-control"
                />
            </div>
            <div class="mb-3">
                <label for="login-password" class="form-label" placeholder="Enter password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="login-password"
                    placeholder="Enter password"
                    required
                    class="form-control"
                />
            </div>
            <div class="mb-3">
                <button class="btn btn-primary">Log in</button>
            </div>
        </form>
    `;
}

export default Login;
