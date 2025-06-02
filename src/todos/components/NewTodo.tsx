'use client';

import { IoTrashOutline } from "react-icons/io5";
// import * as todosApi from '@/todos/helpers/todos';
import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
import { IoMdColorFill } from "react-icons/io";
import { addTodo, deleteCompleted, fillTodos } from "../actions/todo-actions";

export const NewTodo = () => {
    // const router = useRouter();
    const [description, setDescription] = useState('')

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (description.trim().length === 0) return;

        // await todosApi.createTodo(description);
        await addTodo(description);
        setDescription('');
        // router.refresh();
    }

    // const deleteCompleted = async () => {
    //     // await todosApi.deleteCompletedTodos();
    //     // router.refresh();
    // }

    // const fillTodos = async () => {
    //     // await todosApi.fillTodos();
    //     // router.refresh();
    // }

    return (
        <form onSubmit={onSubmit} className='flex w-full'>
            <input type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
                placeholder="¿Qué necesita ser hecho?" />

            <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all cursor-pointer">
                Crear
            </button>

            <span className='flex flex-1'></span>
            <button className="flex bg-emerald-400 items-center justify-center gap-2 rounded-lg text-white py-1 px-3 hover:bg-emerald-700 transition-all cursor-pointer"
                onClick={() => fillTodos()}>
                <IoMdColorFill />
                Llenar Todos Base
            </button>

            <button
                onClick={() => deleteCompleted()}
                type='button' className="flex items-center justify-center gap-2 rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all cursor-pointer">
                <IoTrashOutline />
                Borrar Completados
            </button>


        </form>
    )
}