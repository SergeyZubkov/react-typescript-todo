export interface User {
    id: string,
    name: string
}

export interface Todo {
    id: string,
    userId: string,
    title: string,
    completed: boolean
}

type TodoKeysWithoutUserId = Exclude<keyof Todo, 'userId'>

export type RawTodo = {
    [P in TodoKeysWithoutUserId]: Todo[P]
}