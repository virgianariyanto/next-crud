import Link from "next/link";
import UserCreateForm from "@/app/components/UserCreateForm";
import { createUserAction } from "../action";

export default function CreateUser() {
    return (
        <div className="min-h-screen bg-zinc-50 p-8 dark:bg-zinc-950">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Create User</h1>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Create a new user in the system</p>
                    </div>
                    <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Back to List
                    </Link>
                </div>
            </div>
            <UserCreateForm action={createUserAction} mode="create"/>
        </div>
    )
}