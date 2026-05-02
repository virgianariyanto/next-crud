"use client"

import { ActionState, User } from "../library/types"
import { useActionState } from "react"
import SubmitButton from "./SubmitButton";

type Props = {
    action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
    user?: User;
    mode: "create" | "update";
}

const initialState: ActionState = {
    success: false,
    message: "",
}

export default function UserForm ({ action, user, mode }: Props) {
    const [state, formAction] = useActionState(action, initialState);

    return (
        <form action={formAction} className="mx-auto max-w-6xl rounded-xl">
            {state.message && !state.success && (
                <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
                    {state.message}
                </div>
            )}
            {state.message && state.success && (
                <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-900/20 dark:text-green-400">
                    {state.message}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-zinc-900 dark:text-white">Name</label>
                    <input type="text" name="name" id="name" className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" defaultValue={user?.name}/>
                    {state.errors?.name && <p className="text-sm text-red-600 dark:text-red-400">{state.errors.name[0]}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-zinc-900 dark:text-white">Email</label>
                    <input type="email" name="email" id="email" className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" defaultValue={user?.email}/>
                    {state.errors?.email && <p className="text-sm text-red-600 dark:text-red-400">{state.errors.email[0]}</p>}
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-zinc-900 dark:text-white">Address</label>
                    <input type="text" name="address" id="address" className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" defaultValue={user?.address}/>
                    {state.errors?.address && <p className="text-sm text-red-600 dark:text-red-400">{state.errors.address[0]}</p>}
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-zinc-900 dark:text-white">Phone</label>
                    <input type="text" name="phone" id="phone" className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white" defaultValue={user?.phone}/>
                    {state.errors?.phone && <p className="text-sm text-red-600 dark:text-red-400">{state.errors.phone[0]}</p>}
                </div>
                <div className="flex justify-end">
                    <SubmitButton label={mode === "create" ? "Create User" : "Update User"} loadingLabel={mode === "create" ? "Menyimpan..." : "Memperbarui..."}/>
                </div>
            </div>
        </form>
    )
}