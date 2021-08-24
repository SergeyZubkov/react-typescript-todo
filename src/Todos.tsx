import { RawTodo, Todo } from './types';
import List from './List';
import TodoItem from './TodoItem';
import { useEffect, useReducer } from 'react';
import TodoForm from './TodoForm';

interface TodosProps {
    data: Todo[],
    userId: string | undefined,
    userName: string | undefined
}

export type TodoAction = 
    | { type: 'toggle', id: string }
    | { type: 'delete', id: string }
    | { type: 'add', newTodo: Todo }
    | { type: 'change', payload: { id: string, title: string } }
    | { type: 'replaceAll', todos: Todo[] }


const reducer = (state: Todo[], action: TodoAction):Todo[] => {
    switch (action.type) {
        case 'add':
            return [ action.newTodo, ...state]
        case 'toggle':
            return state.map(
                (todo) => {
                    if (todo.id === action.id) {
                       return {...todo, completed: !todo.completed}
                    }
                    return todo
                }
            )
        case 'delete':
            return state.filter(
                todo => todo.id !== action.id
            )
        case 'change':
            const { id, title } = action.payload
            return state.map(
                (todo) => {
                    if (todo.id === id) {
                       return {...todo, title}
                    }
                    return todo
                }
            )
        case 'replaceAll': 
            return [...action.todos]
        default:
            return state;
    }
}

function Todos(props: TodosProps):React.ReactElement {
    const { data: initialTodos, userId, userName } = props;
    const [todos, dispatch] = useReducer(reducer, initialTodos)

    const add = (rawTodo: RawTodo) => {
        dispatch({
            type: 'add',
            newTodo: {
                ...rawTodo,
                userId: userId as string
            }
        })
    }

    useEffect(() => {
        dispatch({
            type: 'replaceAll',
            todos: props.data
        })
    }, [props.data])
    
    return (
        <div>
            <div
                style={{
                    padding: "5px 10px"
                }}
            >
                <h2>
                    Список задач пользовтеля {userName ? userName : <i style={{fontWeight: 400}}>выберите пользователя</i>}
                </h2>
                <TodoForm onSubmit={add} />
            </div>
            <List
                data={todos}
                renderItem={(item) => <TodoItem key={item.id} data={item} dispatch={dispatch} />}
            />
        </div>
    )
}

export default Todos;