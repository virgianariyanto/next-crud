"use client"

import { useFormStatus } from "react-dom";

type Props = {
    label: string;
    loadingLabel?: string;
}

export default function SubmitButton({label, loadingLabel = "Menyimpan..."}: Props) {
    const {pending} = useFormStatus();

    return (
        <button className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {pending ? loadingLabel : label}
        </button>
    )
}