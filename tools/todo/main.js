import { VANILA_API } from "../../exports/config.js";

const form = document.getElementById("myForm");
const getRefreshedData = document.getElementById("refresh-data");
const total_todos_count = document.getElementById("total-todos-count");
const vanilaApi = VANILA_API;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = form.title.value;
  const details = form.details.value;

  const res = await fetch(`${vanilaApi}/create-todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, details }),
  });
  if (res.ok) {
    form.reset();
  }
  const data = await res.json();
  alert(data.message);
  getAllTodo();
  // console.log(data);
});

getRefreshedData.addEventListener("click", async (e) => {
  e.preventDefault();

  getAllTodo();
});
async function getAllTodo() {
  try {
    const res = await fetch(`${vanilaApi}/get-all-todo`, {});
    if (!res.ok) {
      throw new Error(response.status);
    }
    const result = await res.json();

    total_todos_count.textContent = "Total : " + result.data.length;

    const todoList = document.getElementById("todo-list-data");
    todoList.innerHTML = "";

    result.data.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = `${todo.title} - ${todo.details}`;
      todoList.appendChild(li);
    });

    // console.log(result.data.length);
  } catch (error) {
    console.log(error.message);
  }
}
getAllTodo();
