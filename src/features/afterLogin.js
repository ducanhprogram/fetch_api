const serverApi = `http://localhost:3000`;

const getLogin = async (data) => {
    try {
        const response = await fetch(`${serverApi}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            alert("Đăng nhập thất bại!!!");
            throw new Error("Đăng nhập thất bại!");
        }

        const userData = await response.json();
        alert("Login successful!");
    } catch (e) {
        console.log(e.message);
    }
};

const afterLogin = () => {
    const loginForm = document.querySelector("#login-form");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        getLogin(data);
        loginForm.reset();
    });
};

export default afterLogin;
