import Home from "./src/pages/Home";
import afterRegister from "./src/features/afterRegister";
import afterLogin from "./src/features/afterLogin";
import afterTodoApp from "./src/features/afterTodoApp";

import Register from "./src/pages/Register";
import Login from "./src/pages/Login";
import TodoApp from "./src/pages/TodoApp";
import "./style.css";
import Navigo from "navigo";

const router = new Navigo("/", { linksSelector: "a" });

//target: Tham số đại diện cho phần tử HTML mà bạn muốn hiển thị nội dung (ở đây là #app)

//content: Tham số đại diện cho nội dung mà bạn muốn hiển thị target (ở đây là component)

const app = document.querySelector("#app");
function render(contentFn, beforeFn, afterFn) {
    if (beforeFn) {
        beforeFn();
    }

    app.innerHTML = contentFn();

    if (afterFn) {
        afterFn();
    }
}

//Định nghĩa trang.
router.on({
    "/": () => render(Home),
    "/register": () => render(Register, null, afterRegister),
    "/Login": () => render(Login, null, afterLogin),
    "/todos": () => render(TodoApp, null, afterTodoApp),
});

router.resolve();
