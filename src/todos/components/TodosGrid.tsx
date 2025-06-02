'use client'

import { Todo } from '@prisma/client'
import React from 'react'
import { TodosItem } from './todos-item/TodosItem'
import { toggleTodo } from '../actions/todo-actions'
// import * as todosApi from '@/todos/helpers/todos'
// import { useRouter } from 'next/navigation'

interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
    // const router = useRouter();

    // const toggleTodo = async (id: string, complete: boolean) => {
    //     await todosApi.updateTodo(id, complete);
    //     router.refresh();
    // }

    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
            {todos.map((todo) => (
                <TodosItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))}
        </div>
    )
}
