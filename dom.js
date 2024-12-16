    import { projectList, deleteProject, createProject, saveToLocalStorage } from './todolist.js';

    export class DOMManager {
        constructor(containerSelector) {
            this.container = document.querySelector(containerSelector); // Main container
        }
    
        // Clear the container
        clearContainer() {
            this.container.innerHTML = '';
        }
    
        renderProjects() {
            this.clearContainer(); // Clear the container first
    
            // Render "Create New Project" button
            const createProjectButton = document.createElement('button');
            createProjectButton.textContent = 'Create New Project';
            createProjectButton.classList.add('create-project-btn');
            this.container.appendChild(createProjectButton);
    
            createProjectButton.addEventListener('click', () => {
                this.showCreateProjectForm();
            });
    
            // Render existing projects
            projectList.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');
    
                const projectTitle = document.createElement('h2');
                projectTitle.textContent = project.projectName;
                projectDiv.appendChild(projectTitle);
    
                // Add Delete Project button
                const deleteProjectButton = document.createElement('button');
                deleteProjectButton.textContent = 'Delete Project';
                projectDiv.appendChild(deleteProjectButton);
    
                deleteProjectButton.addEventListener('click', () => {
                    deleteProject(project.projectName);
                    this.renderProjects();
                });
    
                // Add Create Todo button
                const createTodoButton = document.createElement('button');
                createTodoButton.textContent = 'Create New Todo';
                projectDiv.appendChild(createTodoButton);
    
                createTodoButton.addEventListener('click', () => {
                    this.showCreateTodoForm(project);
                });
    
                // Render todos
                project.todoList.forEach(todo => {
                    const todoDiv = document.createElement('div');
                    todoDiv.classList.add('todo');
                    todoDiv.dataset.priority = todo.priority;
    
                    const todoTitle = document.createElement('h1');
                    todoTitle.textContent = todo.title;
    
                    const rankingBadge = document.createElement('span');
                    rankingBadge.classList.add('todo-ranking');
                    rankingBadge.textContent = `Rank: ${todo.priority}`;
                    todoTitle.appendChild(rankingBadge);
    
                    const todoDueDate = document.createElement('p');
                    todoDueDate.classList.add('todo-due-date');
                    todoDueDate.textContent = `Due: ${todo.dueDate}`;
    
                    const todoDescription = document.createElement('p');
                    todoDescription.textContent = todo.description;
    
                    todoDiv.appendChild(todoTitle);
                    todoDiv.appendChild(todoDueDate);
                    todoDiv.appendChild(todoDescription);
    
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    todoDiv.appendChild(editButton);
    
                    editButton.addEventListener('click', () => {
                        this.showEditForm(todo);
                    });
    
                    const deleteTodoButton = document.createElement('button');
                    deleteTodoButton.textContent = 'Delete';
                    todoDiv.appendChild(deleteTodoButton);
    
                    deleteTodoButton.addEventListener('click', (e) => {
                        e.stopPropagation();
                        project.deleteTodo(todo.title);
                        this.renderProjects();
                    });
    
                    projectDiv.appendChild(todoDiv);
                });
    
                this.container.appendChild(projectDiv);
            });
        }
    
        showCreateProjectForm() {
            const formEdit = document.querySelector('.formedit');
    
            formEdit.innerHTML = '';
            const form = document.createElement('form');
            form.classList.add('edit-form');
    
            const projectNameInput = document.createElement('input');
            projectNameInput.type = 'text';
            projectNameInput.placeholder = 'New Project Name';
            form.appendChild(projectNameInput);
    
            const formButton = document.createElement('div');
            formButton.classList.add('formButton');
    
            const saveButton = document.createElement('button');
            saveButton.type = 'submit';
            saveButton.textContent = 'Create';
            formButton.appendChild(saveButton);
    
            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.textContent = 'Cancel';
            formButton.appendChild(cancelButton);
    
            form.appendChild(formButton);
            formEdit.appendChild(form);
    
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (projectNameInput.value.trim() === '') {
                    alert('Project name cannot be empty.');
                    return;
                }
                const newProject = createProject(projectNameInput.value.trim());
                this.renderProjects();
                formEdit.innerHTML = '';
            });
    
            cancelButton.addEventListener('click', () => {
                formEdit.innerHTML = '';
            });
        }

        showEditForm(todo) {
            const formEdit = document.querySelector('.formedit');

            formEdit.innerHTML = '';
            // Create and display a form for editing
            const form = document.createElement('form');
            form.classList.add('edit-form');
        
            // Title Input
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.value = todo.title;
            form.appendChild(titleInput);
        
            // Description Input
            const descriptionInput = document.createElement('textarea');
            descriptionInput.value = todo.description;
            form.appendChild(descriptionInput);
        
            // Due Date Input
            const dueDateInput = document.createElement('input');
            dueDateInput.type = 'date';
            dueDateInput.value = todo.dueDate;
            form.appendChild(dueDateInput);
        
            // Priority Select
            const prioritySelect = document.createElement('select');
            [1, 2, 3].forEach(priority => {
                const option = document.createElement('option');
                option.value = priority;
                option.textContent = `Priority ${priority}`;
                if (priority == todo.priority) option.selected = true;
                prioritySelect.appendChild(option);
            });
            form.appendChild(prioritySelect);
            
            const formButton = document.createElement('div');
            formButton.classList.add('formButton');
            // Save and Cancel buttons
            const saveButton = document.createElement('button');
            saveButton.type = 'submit';
            saveButton.textContent = 'Save';
        
            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.textContent = 'Cancel';
        
            formButton.appendChild(saveButton);
            formButton.appendChild(cancelButton);
            
            form.appendChild(formButton);
            // Append form to the todo container
            formEdit.appendChild(form);
        
            // Handle form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
        
                // Update todo properties
                todo.title = titleInput.value;
                todo.description = descriptionInput.value;
                todo.dueDate = dueDateInput.value;
                todo.priority = parseInt(prioritySelect.value);

                saveToLocalStorage();
        
                // Re-render projects
                this.renderProjects();
                formEdit.innerHTML = '';
            });
        
            // Handle cancel
            cancelButton.addEventListener('click', () => {
                formEdit.innerHTML = '';
            });
        }

        showCreateTodoForm(project) {
            const formEdit = document.querySelector('.formedit');
        
            // Clear any existing form
            formEdit.innerHTML = '';
        
            // Create and display a form for creating a new todo
            const form = document.createElement('form');
            form.classList.add('edit-form');
        
            // Title Input
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.placeholder = 'Todo Title';
            form.appendChild(titleInput);
        
            // Description Input
            const descriptionInput = document.createElement('textarea');
            descriptionInput.placeholder = 'Todo Description';
            form.appendChild(descriptionInput);
        
            // Due Date Input
            const dueDateInput = document.createElement('input');
            dueDateInput.type = 'date';
            form.appendChild(dueDateInput);
        
            // Priority Select
            const prioritySelect = document.createElement('select');
            [1, 2, 3].forEach(priority => {
                const option = document.createElement('option');
                option.value = priority;
                option.textContent = `Priority ${priority}`;
                prioritySelect.appendChild(option);
            });
            form.appendChild(prioritySelect);
        
            // Save and Cancel Buttons
            const formButton = document.createElement('div');
            formButton.classList.add('formButton');
        
            const saveButton = document.createElement('button');
            saveButton.type = 'submit';
            saveButton.textContent = 'Create';
        
            const cancelButton = document.createElement('button');
            cancelButton.type = 'button';
            cancelButton.textContent = 'Cancel';
        
            formButton.appendChild(saveButton);
            formButton.appendChild(cancelButton);
            form.appendChild(formButton);
        
            formEdit.appendChild(form);
        
            // Handle form submission
            form.addEventListener('submit', (e) => {
                e.preventDefault();
        
                // Add a new todo to the project
                const newTodo = {
                    title: titleInput.value,
                    description: descriptionInput.value,
                    dueDate: dueDateInput.value,
                    priority: parseInt(prioritySelect.value)
                };
        
                project.todoList.push(newTodo);

                saveToLocalStorage();
        
                // Re-render the projects and clear the form
                this.renderProjects();
                formEdit.innerHTML = '';
            });
        
            // Handle cancel
            cancelButton.addEventListener('click', () => {
                formEdit.innerHTML = ''; // Clear the form
            });
        }

        
        
        
        
    }

