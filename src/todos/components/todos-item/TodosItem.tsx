'use client'

import { startTransition, useOptimistic } from 'react'
import { Todo } from '@prisma/client'
import React from 'react'
import style from './TodosItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import { usePathname } from 'next/navigation'

interface Props {
    todo: Todo,
    toggleTodo: (path: string, id: string, complete: boolean) => Promise<Todo | void>
}

export const TodosItem = ({ todo, toggleTodo }: Props) => {
    const pathname = usePathname()

    const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
        todo,
        (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
    );

    const onToggleTodo = async () => {
        try {
            startTransition(() =>
                toggleTodoOptimistic(!todoOptimistic.complete))
            await toggleTodo(pathname, todoOptimistic.id, !todoOptimistic.complete);
        } catch {
            startTransition(() =>
                toggleTodoOptimistic(!todoOptimistic.complete))
        }
    }

    return (
        <div className={todoOptimistic.complete ? style.todoDone : style.todoPending}>
            <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>
                <div
                    // onClick={() => toggleTodo(pathname, todoOptimistic.id, !todoOptimistic.complete)}
                    onClick={onToggleTodo}
                    className={`
                    flex p-2 rounded-md cursor-pointer hover:opacity-60
                    ${todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'}
                `}>{
                        todoOptimistic.complete ? (
                            <IoCheckboxOutline size={30} />
                        ) : (
                            <IoSquareOutline size={30} />
                        )
                    }
                </div>
                <div className='text-center sm:text-left'>
                    {todoOptimistic.description}
                </div>
            </div>
        </div>
    )
}
