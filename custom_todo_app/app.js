let todoList = JSON.parse(localStorage.getItem("myTodos")) || [];

function saveTodoList() {
  // 할 일 목록을 로컬 스토리지에 저장
  localStorage.setItem("myTodos", JSON.stringify(todoList));
}

function renderTodoItem(todo, index) {
  const todoItem = document.createElement("li");

  // 왼쪽: 체크박스 + 텍스트
  const todoTextWrapper = document.createElement("div");
  todoTextWrapper.className = "todo-text";

  const todoCheckbox = document.createElement("span");
  todoCheckbox.className = "custom-checkbox";
  if (todo.checked) {
    todoCheckbox.classList.add("checked"); // 체크 상태 반영
  }

  todoCheckbox.onclick = () => {
    todo.checked = !todo.checked;  // 체크 상태 변경
    saveTodoList();
    renderTodoList();
  };

  const todoTextSpan = document.createElement("span");
  todoTextSpan.textContent = todo.text;

  todoTextWrapper.appendChild(todoCheckbox);
  todoTextWrapper.appendChild(todoTextSpan);

  // 오른쪽: 수정/삭제 버튼 감싸는 div
  const todoActionsWrapper = document.createElement("div");
  todoActionsWrapper.className = "todo-actions";

  // 수정 버튼
  const editBtn = document.createElement("button");
  const editIcon = document.createElement("i");
  editIcon.classList.add("fas", "fa-pen");
  editBtn.appendChild(editIcon);
  editBtn.onclick = () => {
    const updatedText = prompt("수정할 내용을 입력하세요", todo.text);
    if (updatedText) {
      todo.text = updatedText;
      saveTodoList();
      renderTodoList();
    }
  };

  // 삭제 버튼
  const deleteBtn = document.createElement("button");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-minus-circle");
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.onclick = () => {
    todoList.splice(index, 1);
    saveTodoList();
    renderTodoList();
  };

  todoActionsWrapper.appendChild(editBtn);
  todoActionsWrapper.appendChild(deleteBtn);

  
  todoItem.appendChild(todoTextWrapper);
  todoItem.appendChild(todoActionsWrapper);
  return todoItem;
}

function renderTodoList() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  todoList.forEach((todo, index) => {
    const todoItem = renderTodoItem(todo, index);
    list.appendChild(todoItem);
  });
}

function addTodo() {
  const newTodoText = prompt("할 일을 입력하세요:");
  if (newTodoText) {
    todoList.push({ text: newTodoText, checked: false });
    saveTodoList();
    renderTodoList();
  }
}

renderTodoList();
