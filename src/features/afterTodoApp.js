// afterTodoApp.js

import "../assets/styles/todoApp.css";
const API_URL = "http://localhost:3000/tasks";
const userId = 1;
let editingTaskId = null;

function afterTodoApp() {
    document.addEventListener("DOMContentLoaded", () => {
        document
            .getElementById("addTaskBtn")
            .addEventListener("click", addTask);
        document
            .getElementById("taskTitle")
            .addEventListener("keydown", (event) => {
                if (event.key === "Enter") addTask();
            });
        fetchTasks();
    });
}

async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        console.log("Fetched tasks after update:", tasks);
        if (!Array.isArray(tasks)) {
            throw new Error(
                "Expected an array but got: " + JSON.stringify(tasks)
            );
        }
        renderTasks(tasks);
        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
}

function renderTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const isEditing = editingTaskId === task.id;
        const row = document.createElement("tr");
        row.id = `row-${task.id}`;
        row.className = isEditing ? "editing" : "";

        row.innerHTML = `
            <td>
                ${
                    isEditing
                        ? `<input type='text' id='edit-title-${task.id}' value='${task.title}' onkeydown="handleEditEnter(event, ${task.id})">`
                        : task.title
                }
            </td>
            <td>
                ${
                    isEditing
                        ? `
                    <select id='edit-status-${task.id}'>
                        <option value="todo" ${
                            task.status === "todo" ? "selected" : ""
                        }>Todo</option>
                        <option value="doing" ${
                            task.status === "doing" ? "selected" : ""
                        }>Doing</option>
                        <option value="done" ${
                            task.status === "done" ? "selected" : ""
                        }>Done</option>
                    </select>
                `
                        : task.status
                }
            </td>
            <td>
                ${
                    isEditing
                        ? `
                    <select id='edit-priority-${task.id}'>
                        <option value="1" ${
                            task.priority === "1" ? "selected" : ""
                        }>Low</option>
                        <option value="2" ${
                            task.priority === "2" ? "selected" : ""
                        }>Medium</option>
                        <option value="3" ${
                            task.priority === "3" ? "selected" : ""
                        }>High</option>
                    </select>
                `
                        : task.priority
                }
            </td>
            <td></td>
        `;

        // Thêm nút "Edit" hoặc "Save"
        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-edit");
        editButton.innerHTML = isEditing
            ? `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160v212q-19-8-39.5-10.5t-40.5.5v-169L647-760H200v560h240v80H200Zm0-640v560-560ZM520-40v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-260L643-40H520Zm300-263-37-37 37 37ZM580-100h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19ZM240-560h360v-160H240v160Zm240 320h4l116-115v-5q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z"/></svg>`
            : `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#48752C"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>`;
        editButton.addEventListener("click", () => {
            if (isEditing) {
                saveTask(task.id);
            } else {
                editTask(task.id);
            }
        });
        row.children[3].appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-delete");
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg> `;
        deleteButton.addEventListener("click", () =>
            confirmDeleteTask(task.id)
        );
        row.children[3].appendChild(deleteButton);

        taskList.appendChild(row);
    });
}

function editTask(taskId) {
    editingTaskId = taskId;
    fetchTasks();
}

function handleEditEnter(event, taskId) {
    if (event.key === "Enter") saveTask(taskId);
}

async function saveTask(taskId) {
    let title = document.getElementById(`edit-title-${taskId}`).value.trim();

    title = title.replace(/\s+/g, " ");

    const status = document.getElementById(`edit-status-${taskId}`).value;
    const priority = document.getElementById(`edit-priority-${taskId}`).value;

    // Chuẩn hóa title
    const normalizedTitle = title.toLowerCase();

    // Lấy danh sách task từ API
    const tasks = await fetchTasks();
    if (!Array.isArray(tasks)) {
        console.error("Tasks is not a valid array:", tasks);
        return;
    }

    const isDuplicate = tasks.some(
        (task) =>
            task.id !== taskId &&
            task.title.trim().toLowerCase() === normalizedTitle
    );

    if (isDuplicate) {
        alert("Task title already exists. Please choose a different title.");
        return;
    }

    await fetch(`${API_URL}/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status, priority }),
    });

    editingTaskId = null;
    fetchTasks();
}

async function addTask() {
    let title = document.getElementById("taskTitle").value.trim();

    title = title.replace(/\s+/g, " ");

    const status = document.getElementById("taskStatus").value;
    const priority = document.getElementById("taskPriority").value;

    if (title === "") {
        alert("Task title cannot be empty or just whitespace.");
        return;
    }

    const tasks = await fetchTasks();
    if (!Array.isArray(tasks)) {
        console.error("Tasks is not a valid array:", tasks);
        return;
    }

    // Kiểm tra trùng lặp (so sánh title đã chuẩn hóa)
    const isDuplicate = tasks.some(
        (task) => task.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (isDuplicate) {
        alert("Task title already exists. Please choose a different title.");
        return;
    }

    // Thêm task mới vào API
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, status, priority, userId }),
    });

    // Gọi lại renderTasks sau khi thêm task mới
    fetchTasks();

    // Làm sạch ô input
    document.getElementById("taskTitle").value = "";
}

async function confirmDeleteTask(taskId) {
    const isConfirmed = confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
        await deleteTask(taskId);
    }
}

async function deleteTask(taskId) {
    await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
    fetchTasks();
}

export default afterTodoApp;

window.addTask = addTask;
window.deleteTask = deleteTask;
window.confirmDeleteTask = confirmDeleteTask;
window.editTask = editTask;
window.saveTask = saveTask;
window.handleEditEnter = handleEditEnter;
