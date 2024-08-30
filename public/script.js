// public/app.js
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        fetch('/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.message === 'User registered successfully') {
              window.location.href = '/login'; // Redirect to login
            }
          });
      });
    }
  
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
  
        fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.message === 'Logged in successfully') {
              window.location.href = '/index'; // Redirect to to-do list
            }
          });
      });
    }
  
    const addTodoForm = document.getElementById('add-todo-form');
    if (addTodoForm) {
      addTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = document.getElementById('todo-text').value;
        const date_time = document.getElementById('todo-date-time').value;
  
        fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, date_time }),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.message === 'To-Do added successfully') {
              loadTodos(); // Refresh the list
            }
          });
      });
    }
  
    function loadTodos() {
      fetch('/api/todos')
        .then((response) => response.json())
        .then((todos) => {
          const todoList = document.getElementById('todo-list');
          todoList.innerHTML = '';
          todos.forEach((todo) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
              <span class="${todo.is_complete ? 'text-success' : ''}">${todo.text} (Due: ${new Date(todo.date_time).toLocaleString()})</span>
              <div>
                <button class="btn btn-success btn-sm mr-2" onclick="markComplete(${todo.id})">Complete</button>
                <button class="btn btn-warning btn-sm mr-2" onclick="editTodoForm(${todo.id}, '${todo.text}', '${todo.date_time}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">Delete</button>
              </div>
            `;
            todoList.appendChild(listItem);
          });
        });
    }
  
    window.markComplete = function(id) {
        fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ is_complete: true }), // Ensure is_complete is sent in the request body
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.message === 'To-Do updated successfully') {
              loadTodos(); // Refresh the list
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Error updating to-do');
          });
      };
      
  
    window.editTodoForm = function(id, text, date_time) {
      const newText = prompt('Edit To-Do:', text);
      const newDateTime = prompt('Edit Due Date and Time (YYYY-MM-DDTHH:MM):', date_time);
      if (newText && newDateTime) {
        fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: newText, date_time: newDateTime }),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.message === 'To-Do updated successfully') {
              loadTodos(); // Refresh the list
            }
          });
      }
    };
  
    window.deleteTodo = function(id) {
      if (confirm('Are you sure you want to delete this To-Do?')) {
        fetch(`/api/todos/${id}`, {
          method: 'DELETE',
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
            if (data.message === 'To-Do deleted successfully') {
              loadTodos(); // Refresh the list
            }
          });
      }
    };
  
    loadTodos(); // Initial load
  });
  