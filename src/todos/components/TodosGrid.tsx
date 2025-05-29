'use client'

import { Todo } from '@prisma/client'
import React from 'react'
import { TodosItem } from './todos-item/TodosItem'
import * as api from '@/todos/helpers/todos'

interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4'>
            {todos.map((todo) => (
                <TodosItem key={todo.id} todo={todo} toggleTodo={api.updateTodo} />
            ))}
        </div>
    )
}
