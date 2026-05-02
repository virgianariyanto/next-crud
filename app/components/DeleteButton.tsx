"use client";

import { useActionState } from "react";
import { ActionState } from "../library/types";
import { deleteUserAction } from "../user/action";
import { useFormStatus } from "react-dom";


type Props = {
    id: string;
    name: string;
}

export default function DeleteButton({id, name}: Props) {
    const initialState: ActionState = {
        success: false,
        message: ""
    }

    const deletedWithId = deleteUserAction.bind(null, id);
    const [state, formAction] = useActionState(deletedWithId, initialState);

    function handleDelete(e: React.FormEvent<HTMLFormElement>) {
        if(!confirm(`Are you sure you want to delete ${name}?`)) {
            e.preventDefault();
        }
    }

    const { pending } = useFormStatus();
    
    return (
        <form action={formAction} onSubmit={handleDelete}>
            <button className="text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300" disabled={pending}>
              {pending ? "Deleting..." : "Delete"}
            </button>
        </form>
    )
}