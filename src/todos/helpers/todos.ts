import { Todo } from "@prisma/client";

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
    const body = { complete };

    const dbTodo = await fetch(`/api/todos/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());

    return dbTodo;
}

export const createTodo = async (description: string): Promise<Todo> => {
    const body = { description };

    const dbTodo = await fetch(`/api/todos`,
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());

    return dbTodo;
}

export const deleteCompletedTodos = async () => await fetch(`/api/todos`, { method: 'DELETE' });

export const fillTodos = async () => await fetch(`/api/seed`, { method: 'GET' });