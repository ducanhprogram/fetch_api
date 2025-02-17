import "../assets/styles/registerLogin.css";

function Register() {
    return /*html*/ `
        <form id="register-form">
            <h2>Register</h2>
            <div class="mb-3">
                <label for="register-email" class="form-label">Email</label>
                <input type="text" name="email" id="register-email" required class="form-control"  placeholder="Enter email"/>
                <p class="email-error" style="color: red"></p>
            </div>
            <div class="mb-3">
                <label for="register-password" class="form-label">Password</label>
                <input type="password" name="password" id="register-password" required class="form-control" placeholder="Enter password" />
                <p class="password-error" style="color: red"></p>
            </div>
            <div class="mb-3">
                <button class="btn btn-primary">Register</button>
            </div>
        </form>
    `;
}

export default Register;
