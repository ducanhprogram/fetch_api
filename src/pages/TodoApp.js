import "../assets/styles/todoApp.css";

function TodoApp() {
    return /*html*/ `
         <div class="container">
        <h2>Todo List</h2>
        <div class="input-group">
            <input type="text" id="taskTitle" placeholder="Task title">
            <select id="taskStatus">
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
            </select>
            <select id="taskPriority">
                <option value="1">Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
            </select>
            <button id="addTaskBtn" class="btn btn-add" onclick="addTask()">Thêm Task</button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="taskList"></tbody>
        </table>
    `;
}

export default TodoApp;
