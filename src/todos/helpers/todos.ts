import { Todo } from "@prisma/client";

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
    console.log(id, complete);
    const body = { complete };

    const dbTodo = await fetch(`/api/todos/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json());

    console.log(dbTodo);

    return dbTodo;
}