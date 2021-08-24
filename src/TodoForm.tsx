import React, { useState } from "react";
import { RawTodo } from "./types";

interface TodoFormProps {
    onSubmit: (newTodo: RawTodo) => void
}

function TodoForm(props: TodoFormProps) {
    const { onSubmit } = props;
    const [todoText, setTodoText] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodoText(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!todoText.trim()) return

        onSubmit({
            id: String( Math.random()),
            title: todoText,
            completed: false
        })

        setTodoText('')
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={todoText} 
                placeholder='надо сделать ...' 
                onChange={handleChange}
            />
            <button type="submit">Добавить</button>
        </form>
    )
}

export default TodoForm