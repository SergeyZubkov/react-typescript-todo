import { useState } from 'react';
import { Todo } from './types';
import { TodoAction } from './Todos';

interface TodoItemProps {
    data: Todo,
    dispatch: React.Dispatch<TodoAction>
}

function TodoItem(props: TodoItemProps):React.ReactElement {
    const { data, dispatch } = props;
    const { title, completed, id } = data;

    const toggle = () => dispatch({
        type: 'toggle',
        id
    })

    const remove = () => dispatch({
        type: 'delete',
        id
    })

    const [editMode, setEditMode] = useState(false)

    const editModeOn = () => setEditMode(true)
    const editModeOff = () => setEditMode(false)

    const [newTitle, setNewTitle] = useState(title)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value)
    }

    const handleSubmit = () => {
        dispatch({
            type: 'change',
            payload: {
                id,
                title: newTitle
            }
        })

        editModeOff()
    }
    if (!editMode) {
        return (
            <div 
                style={{
                    margin: "5px 0"
                }}
                onClick={toggle}
            >
                <input 
                    style={{
                        verticalAlign: "bottom"
                    }}
                    type="checkbox" 
                    checked={completed} 
                    readOnly
                />
                <span style={{
                    padding: "5px 10px 5px 5px"
                }}>
                    { title }
                </span>
                <button onClick={remove}>удалить</button>
                <button onClick={editModeOn}>редактировать</button>
            </div>
        )
    }else {
        return (
            <form onClick={toggle}>
                <input type="text" value={newTitle} onChange={handleChange}/>
                <button onClick={editModeOff}>Отмена</button>
                <button onClick={handleSubmit}>OK</button>
            </form>
        )
    }
}

export default TodoItem
