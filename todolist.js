import { Project } from './project.js';
import { Todo } from './todo.js';

const defaultProject = new Project('Default');

export const projectList = JSON.parse(localStorage.getItem('projectList')) || [defaultProject];

export function createProject(projectName) {
    const newProject = new Project(projectName);
    projectList.push(newProject);
    saveToLocalStorage();
    return newProject;
}

export function addTodoToProject(projectName, todo) {
    const project = projectList.find(p => p.projectName === projectName);
    if (project){
        project.addToProject(todo);
        saveToLocalStorage();
    } else {
        console.error(`Project ${projectName} not found`);
    }
}

export function deleteProject(project) {
    const index = projectList.findIndex(p => p.projectName === project);
    if (index !== -1) {
        projectList.splice(index, 1);
        saveToLocalStorage();
    }
}


const exampleTodo = new Todo('Example Task', 'This is an example', '2023-12-25', 1);
defaultProject.addToProject(exampleTodo);

export function saveToLocalStorage() {
    localStorage.setItem('projectList', JSON.stringify(projectList));
}