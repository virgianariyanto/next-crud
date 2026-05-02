"use server"

import { redirect } from "next/navigation";
import { ActionState } from "../library/types";
import * as store from "../library/store"
import { revalidatePath } from "next/cache";

function validateUserForm(data: {
    name: string,
    email: string,
    address: string,
    phone: string,
}): NonNullable<ActionState["errors"]>{
    const errors: NonNullable<ActionState["errors"]> = {};
    
    if (!data.name || !data.name.trim().length) {
        errors.name = ["Name is required"];
    }
    if (!data.email || !data.email.trim().length) {
        errors.email = ["Email is required"];
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = ["Invalid email format"];
    }

    if (!data.address || !data.address.trim().length) {
        errors.address = ["Address is required"];
    }
    
    if (!data.phone || !data.phone.trim().length) {
        errors.phone = ["Phone is required"];
    }
    
    return errors;
}

export async function createUserAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
    const data = {
        name: (formData.get("name") as string) || "",
        email: (formData.get("email") as string) || "",
        address: (formData.get("address") as string) || "",
        phone: (formData.get("phone") as string) || "",
    }

    const errors = validateUserForm(data);
    if(Object.keys(errors).length > 0) {
        return {
            success: false,
            message: "Validation failed",
            errors,
        }
    }

    store.createUser(data);
    revalidatePath("/");
    redirect("/");
}

export async function updateUserAction(id: string, prevState: ActionState, formData: FormData): Promise<ActionState> {
    const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        phone: formData.get("phone") as string,
    }

    const errors = validateUserForm(data);
    if (Object.keys(errors).length > 0) {
        return {success: false, message: "Validation Failed", errors};
    }

    const result = store.updateUser(id, data);
    if (!result) {
        return {success: false, message: "User Not Found"};
    }

    revalidatePath("/");
    redirect("/");
}

export async function deleteUserAction(id: string): Promise<ActionState> {
    const deleted = store.deleteUser(id);

    if(!deleted) {
        return {success: false, message: "User not found"};
    }

    revalidatePath("/");
    redirect("/");
}