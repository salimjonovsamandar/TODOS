function validate(form) {
  if (!form.value) {
    form.focus();
    form.style.outlineColor = "red";
    return false;
  }
  if (!form.value.trim()) {
    form.focus();
    form.style.outlineColor = "red";
    return false;
  }

  if (!form.value.length >= 4) {
    form.focus();
    form.style.outlineColor = "red";
    alert("Belgilar soni kamida 5 tadan ko'p bo'lishi kerak");
    return false;
  }
  return true;
}

function clear() {
  input.value = "";
}

function SaveLocalStorage(todo) {
  let data = getDataFromStorage();
  data.push(todo);
  localStorage.setItem("todos", JSON.stringify(data));
}

function getDataFromStorage() {
  let data = [];
  if (localStorage.getItem("todos")) {
    data = JSON.parse(localStorage.getItem("todos"));
  }
  return data;
}

function createTodo(todo) {
  let check = "";
  let styleLine = "";

  if (todo.status == "active") {
    check = "";
    styleLine = "text-decoration: none";
  }

  if (todo.status == "inactive") {
    check = "checed";
    styleLine = "text-decoration: line-through";
  }

  return `
  <tr data-item="todo_${todo.id}">
  <td>
    <input type="checkbox" ${check}>
  </td>
  <td><p style =${styleLine} > ${todo.text}</p></td>
  <td>
    <img
      class="update"
      width="30"
      height="30"
      src="./img/update.svg"
      alt="Update icon"
    />
  </td>
  <td>
    <img data-id = "todo_${todo.id}"
      class="delete"
      width="30"
      height="30"
      src="./img/delete.svg"
      alt="Delete icon"
    />
  </td>
</tr>
  `;
}

export { validate, clear, SaveLocalStorage, getDataFromStorage, createTodo };
