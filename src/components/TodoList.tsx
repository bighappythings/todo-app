import { useState } from "react";
import type TodoType from "../todo";
import TodoService from "../todoService";
import TodoForm from "./TodoForm";

const TodoList = () => {
    const [todos, setTodos] = useState<TodoType[]>(TodoService.getTodos());
    const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
    const [editedTodoText, setEditedTodoText] = useState<string>('');

    //function for handling edit actions
    const handleEditStart = (id:number, text:string) => {
        setEditedTodoId(id);
        setEditedTodoText(text);
    }

    const handleEditCancel = () => {
        setEditedTodoId(null);
        setEditedTodoText("");
    };

    const handleEditSave = (id:number) => {
        if(editedTodoText.trim() !== ""){
            const updateTodo = TodoService.updateTodo({
                id,
                text:editedTodoText,
                completed:false
            });
            setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updateTodo : todo)));

            setEditedTodoId(null);
            setEditedTodoText("");
        }
    };

    //function to delete todo
    const handleDeleteTodo = (id: number) => {
        TodoService.deleteTodo(id);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }

    return (
        <div className="todoContainer">
            <div>
                <TodoForm setTodos={setTodos} />
            </div>

            {todos.map((todo) => (
                <div className="items" key={todo.id}>
                    {(editingTodoId === todo.id ? (
                        <div className="editedText">
                            <input
                                type="text"
                                value={editedTodoText} 
                                onChange={(e) => setEditedTodoText(e.target.value)}
                                autoFocus={true}
                            />
                            <button className="btn btn-save" onClick={() => handleEditSave(todo.id)}>Save</button>
                            <button className="btn btn-cancel" onClick={() => handleEditCancel()}>Cancel</button>
                        
                        </div>
                        ): (
                            <div className="editBtn">
                                <span>{todo.text}</span>
                                <button className="btn btn-edit" onClick={() => handleEditStart(todo.id, todo.text)}>Edit</button>
                            </div>
                        )
                    )}

                    <button className="btn btn-delete" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>                  
                </div>
            ))}
        </div>
    )
};

export default TodoList;