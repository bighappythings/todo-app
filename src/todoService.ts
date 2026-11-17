import type TodoType from './todo.ts';

const LOCAL_STORAGE_KEY = 'todos';

const TodoService = { 
    //get todos
    getTodos: (): TodoType[] => {
        const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return todoStr ? JSON.parse(todoStr) : [];
    },

    //adding todos
    addTodos: (text:string): TodoType => {
        const todos = TodoService.getTodos();
        const newTodo: TodoType = {
            id: todos.length + 1,
            text,
            completed: false
        };

        const updateTodos = [...todos, newTodo];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return newTodo;
    },

    //updating todos
    updateTodo: (todo:TodoType): TodoType => {
        const todos = TodoService.getTodos();

        const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return todo;
    },

    //delete todos
    deleteTodo: (id:number): void => {
        const todos = TodoService.getTodos();
        const updateTodos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    }
};

export default TodoService;