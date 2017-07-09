document.addEventListener('DOMContentLoaded', () => {
    console.log('ready');

    const todoForm = document.querySelector('.todo-form');
    const addInput = document.querySelector('.add-input');
    const todoList = document.querySelector('.todo-list');
    const todoItems = document.querySelectorAll('.todo-item');

    const createTodoItem = function (title) {
        const label = document.createElement('label');
        label.innerText = title;
        label.className = 'title';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'textfield';

        const editButton = document.createElement('button');
        editButton.innerText = 'Изменить';
        editButton.className = 'edit';

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Удалить';
        deleteButton.className = 'delete';

        const listItem = document.createElement('li');
        listItem.className = 'todo-item';

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listItem.appendChild(editInput);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        bindEvents(listItem);

        return listItem;
    };

    const toggleTodoItem = function () {
        const parentNode = this.parentNode;
        parentNode.classList.toggle('completed');
    };

    const editTodoItem = function () {
        const parentNode = this.parentNode;
        const title = parentNode.querySelector('.title');
        const editInput = parentNode.querySelector('.textfield');
        const isEditing = parentNode.classList.contains('editing');

        if (isEditing) {
            title.innerText = editInput.value;
        }
    };

    const deleteTodoItem = function () {
        const parentNode = this.parentNode;
        parentNode.remove();
    };

    const bindEvents = function (todoItem) {
        const checkbox = todoItem.querySelector('.checkbox');
        const editButton = todoItem.querySelector('.edit');
        const deleteButton = todoItem.querySelector('.delete');

        checkbox.addEventListener('change', toggleTodoItem);
        editButton.addEventListener('click', editTodoItem);
        deleteButton.addEventListener('click', deleteTodoItem);
    };

    const addTodoItem = function (e) {
        e.preventDefault();

        if (!addInput.value) {
            return alert('Необходимо ввести название задачи');
        }

        const todoItem = createTodoItem(addInput.value);
        todoList.appendChild(todoItem);
        addInput.value = '';
    };

    todoForm.addEventListener('submit', addTodoItem);


});