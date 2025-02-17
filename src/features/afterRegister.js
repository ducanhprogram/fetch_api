const serverApi = `http://localhost:3000`;

const getRegister = async (data) => {
    try {
        const response = await fetch(`${serverApi}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            alert("Đăng ký thất bại!");
            throw new Error("Đăng ký thất bại!");
        }

        const userData = await response.json(); // Sẽ phản hồi và chuyển đổi thành javascript object

        console.log(userData);
        alert("Registration successfull");
    } catch (e) {
        console.error("Có lỗi xảy ra: ", e.message);
    }
};

const afterRegister = () => {
    const registerForm = document.getElementById("register-form");
    const registerEmail = registerForm.querySelector("register-email");

    const emailError = document.querySelector(".email-error");

    const passswordError = document.querySelector(".password-error");
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        const email = data.email;
        const password = data.password;

        if (!email) {
            emailError.textContent = "Email không được để trống";
            return;
        }

        if (password.length < 6) {
            {
                passswordError.textContent =
                    "Password must be at least 6 characters long";
            }
            return;
        }
        console.log(data);

        getRegister(data);
        registerForm.reset();
    });
};

export default afterRegister;
