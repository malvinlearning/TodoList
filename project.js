import { saveToLocalStorage } from "./todolist.js";
export class Project {
    constructor(projectName) {
        this.projectName = projectName;
        this.todoList = [];
    }

    addToProject(todo) {
        this.todoList.push(todo);
        saveToLocalStorage();
    }

    getTodoList() {
        return this.todoList;
    }

    deleteTodo(todoTitle) {
        const index = this.todoList.findIndex(todo => todo.title === todoTitle); // Use this.todoList
        if (index !== -1) {
            this.todoList.splice(index, 1);
            console.log(`Todo '${todoTitle}' deleted from project '${this.projectName}'.`);
            saveToLocalStorage();
        } else {
            console.error(`Todo '${todoTitle}' not found in project '${this.projectName}'.`);
        }
    }
}