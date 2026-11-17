import {useState } from "react";
import type {Dispatch, SetStateAction } from "react";
import TodoService from "../todoService";
import type TodoType from "../todo";

const TodoForm: React.FC<{ setTodos: Dispatch<SetStateAction<TodoType[]>> }> = ({ setTodos }) => {
    const [newTodoText, setNewTodoText] = useState<string>('');

    const handledAddTodo = () => {
        if (newTodoText.trim() !== ""){
            const newTodo = TodoService.addTodos(newTodoText);
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setNewTodoText("");
        }
    };

    return (
        <div className="inputForm">
            <input 
                type="text"
                value={newTodoText} 
                onChange={(e) => setNewTodoText(e.target.value)}
                autoFocus={true}
                placeholder="Add a new task"
            />
            <button className="btn btn-add" onClick={handledAddTodo}>Add Todo</button>
        </div>
    );
};

export default TodoForm;