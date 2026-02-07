"use strict";
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("dueDate");
const viewBox = document.querySelector(".view-box");
const filterButtons = document.querySelectorAll(".filter-button");
let todos = [];
let currentFilter = "All";
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!titleInput.value.trim())
        return;
    const todo = {
        id: Date.now(),
        title: titleInput.value,
        dueDate: dateInput.value,
        completed: false,
    };
    todos.push(todo);
    renderTodos();
    form.reset();
});
function renderTodos() {
    viewBox.innerHTML = "";
    let filteredTodos = todos;
    if (currentFilter === "Completed") {
        filteredTodos = todos.filter((t) => t.completed);
    }
    else if (currentFilter === "Incomplete") {
        filteredTodos = todos.filter((t) => !t.completed);
    }
    filteredTodos.forEach((todo) => {
        var _a, _b;
        const div = document.createElement("div");
        div.className = `todo ${todo.completed ? "completed" : ""}`;
        div.innerHTML = `
      <span>
        ${todo.title}
        ${todo.dueDate ? `(${todo.dueDate})` : ""}
      </span>
      <div class="todo-actions">
        <i class="fa-solid fa-check"></i>
        <i class="fa-solid fa-trash"></i>
      </div>
    `;
        (_a = div.querySelector(".fa-check")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            todo.completed = !todo.completed;
            renderTodos();
        });
        (_b = div.querySelector(".fa-trash")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            todos = todos.filter((t) => t.id !== todo.id);
            renderTodos();
        });
        viewBox.appendChild(div);
    });
}
filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        currentFilter = btn.textContent;
        renderTodos();
    });
});
//# sourceMappingURL=task6.js.map