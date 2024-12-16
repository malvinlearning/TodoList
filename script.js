import {createProject, addTodoToProject} from "./todolist.js";
import { Todo } from "./todo.js";
import { DOMManager } from './dom.js';

// Initialize the DOM Manager with a container
const domManager = new DOMManager('#container');
// Render all projects and todos
domManager.renderProjects();