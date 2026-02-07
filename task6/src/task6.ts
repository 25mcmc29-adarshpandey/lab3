type FilterType = "Completed" | "Incomplete" | "All";

interface Todo {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

const form = document.querySelector("form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const dateInput = document.getElementById("dueDate") as HTMLInputElement;
const viewBox = document.querySelector(".view-box") as HTMLElement;
const filterButtons =
  document.querySelectorAll<HTMLButtonElement>(".filter-button");

let todos: Todo[] = [];
let currentFilter: FilterType = "All";

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();

  if (!titleInput.value.trim()) return;

  const todo: Todo = {
    id: Date.now(),
    title: titleInput.value,
    dueDate: dateInput.value,
    completed: false,
  };

  todos.push(todo);
  renderTodos();
  form.reset();
});

function renderTodos(): void {
  viewBox.innerHTML = "";

  let filteredTodos: Todo[] = todos;

  if (currentFilter === "Completed") {
    filteredTodos = todos.filter((t) => t.completed);
  } else if (currentFilter === "Incomplete") {
    filteredTodos = todos.filter((t) => !t.completed);
  }

  filteredTodos.forEach((todo) => {
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

    div.querySelector(".fa-check")?.addEventListener("click", () => {
      todo.completed = !todo.completed;
      renderTodos();
    });

    div.querySelector(".fa-trash")?.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    });

    viewBox.appendChild(div);
  });
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.textContent as FilterType;
    renderTodos();
  });
});
