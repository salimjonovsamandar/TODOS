import {
  validate,
  clear,
  SaveLocalStorage,
  getDataFromStorage,
  createTodo,
} from "./function.js";

const todoHeader = document.getElementById("todo__header");
const btn = document.getElementById("btn");
const input = document.getElementById("input");
const tbody = document.getElementById("tbody");

function SaveTodoItem() {
  if (validate(input)) {
    const todo = {
      text: input.value,
      id: Date.now(),
      status: "active",
    };

    SaveLocalStorage(todo);
    let todoItem = createTodo(todo);
    tbody.innerHTML += todoItem;

    clear();
  } else {
    console.log("Validatsiyadan o'tmadi");
  }
}

btn.addEventListener("click", function () {
  SaveTodoItem();
});

input &&
  input.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      SaveTodoItem();
    }
  });

function changeStatus(id, status) {
  let data = getDataFromStorage();
  if (data.length) {
    data = data.map((todo) => {
      if (todo.id == id) {
        todo.status = status;
      }
      return todo;
    });
  }
  localStorage.setItem("todos", JSON.stringify(data));
}

document.addEventListener("DOMContentLoaded", function () {
  let data = getDataFromStorage();

  if (data.length) {
    data.forEach((item) => {
      let todo = createTodo(item);
      tbody.innerHTML += todo;
    });
    todoHeader.innerHTML = `Todos (${data.length})`;
  }

  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  if (checkboxes.length) {
    checkboxes.forEach((item) => {
      item.addEventListener("change", function (event) {
        let checedId = this?.parentNode?.parentNode
          ?.getAttribute("data-item")
          .slice(5);

        if (checedId) {
          if (event.target.checked) {
            this.parentElement.nextElementSibling.style.textDecoration = `line-through`;
            this.parentElement.nextElementSibling.style.opacity = `0.5`;
            changeStatus(checedId, "inactive");
          } else {
            this.parentElement.nextElementSibling.style.textDecoration = "none";
            this.parentElement.nextElementSibling.style.opacity = `1`;
            changeStatus(checedId, "active");
          }
        } else {
          console.log("Element topilmadi");
        }
      });
    });
  }

  //delete buttons
  const deleteBtn = document.querySelectorAll(".delete");
  if (deleteBtn.length) {
    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        const btnId = this.getAttribute("data-id").slice(5);

        if (btnId) {
          let isDeleted = confirm("Rosdan ham o'chirmoqchimisiz");

          if (isDeleted) {
            data = data.filter((el) => {
              return el.id != btnId;
            });
            localStorage.setItem("todos", JSON.stringify(data));
            window.location.reload();
          }
        }
      });
    });
  }
  //delete buttons

  
});
