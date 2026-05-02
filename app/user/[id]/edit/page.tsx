import Link from "next/link";
import UserForm from "@/app/components/UserForm";
import { updateUserAction } from "../../action";
import { notFound } from "next/navigation";
import * as store from "@/app/library/store";

type Props = {
    params: Promise<{id: string}>;
}

export default async function EditUser({params}: Props) {
    const {id} = await params;
    const user = store.getUserById(id);

    if (!user) {
        notFound();
    }

    const updateWithId = updateUserAction.bind(null, id);

    return (
        <div className="min-h-screen bg-zinc-50 p-8 dark:bg-zinc-950">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">Edit User</h1>
                        <p className="mt-2 text-zinc-600 dark:text-zinc-400">Edit user information</p>
                    </div>
                    <Link href="/" className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Back to List
                    </Link>
                </div>
            </div>
            <UserForm action={updateWithId} mode="update" user={user}/>
        </div>
    )
}