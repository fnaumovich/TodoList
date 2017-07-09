document.addEventListener('DOMContentLoaded', () => {
    console.log('ready');

    const todoForm = document.querySelector('.todo-form');
    const addInput = document.querySelector('.add-input');
    const todoList = document.querySelector('.todo-list');
    const todoItems = document.querySelectorAll('.todo-item');

    const createElement = function (tag, props, ...children) {
        const element = document.createElement(tag);
        Object.keys(props).forEach( key => element[key] = props[key]);

        children.forEach( item => {
            if (typeof item === 'string') {
                item = document.createTextNode(item);
            }
            element.appendChild(item);
        });

        return element;
    };

    const createTodoItem = function (title) {
        const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
        const label = createElement('label', { className: 'title' }, title);
        const editInput = createElement('input', { type: 'text', className: 'textfield' });
        const editButton = createElement('button', { className: 'edit' }, 'Изменить');
        const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
        const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);

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
            this.innerText = 'Изменить';
        } else {
            editInput.value = title.innerText;
            this.innerText = 'Сохранить';
        }

        parentNode.classList.toggle('editing');
    };

    const deleteTodoItem = function () {
        const parentNode = this.parentNode;
        todoList.removeChild(parentNode);
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

    const load = function () {
        return JSON.parse(localStorage.getItem('todos'));
    };

    const save = function (data) {
        const string = JSON.stringify(data);
        localStorage.setItem('todos', data)
    };

    function init() {
        todoForm.addEventListener('submit', addTodoItem);
        todoItems.forEach(item => bindEvents(item));
    }

    init();
});