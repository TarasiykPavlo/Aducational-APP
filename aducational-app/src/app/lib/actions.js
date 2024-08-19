"use server";

import { redirect } from "next/navigation";
import { supabase } from "./supabase";

// Функція для створення користувача
export async function createUser(formData) {
    const rawFormData = {
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
    };
    // Створити користувача в Supabase
    const { data, error } = await supabase.auth.signUp({
        email: rawFormData.email,
        password: rawFormData.password,
        options: {
            data: {
                username: rawFormData.username,

                role: "user",
            },
        },
    });
    if (error) {
        console.log(error.code);
        return { error: error.code }; // Викидаємо помилку, якщо відбулася помилка під час реєстрації
    }
    console.log(data);
    return data;
}

export async function signIn(formData) {
    const loginData = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const { data, error } = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password,
    });

    if (error) {
        console.error("Error sign in user:", error.message);
        return { error: error.message };
    }

    const userRole = data.user.identities;

    console.log("User signed successfully:", userRole[0].identity_data.role);
    if (userRole[0].identity_data.role === "user") {
        redirect(`/${loginData.locale}/${userRole[0].id}/user/details`);
    }
    if (userRole[0].identity_data.role === "admin") {
        redirect(`/admin`);
    }
    return { data };
}
export async function createNewGroup(formData) {
    const groupName = formData.get("groupName");
    const division = formData.get("division");

    const { data, error } = await supabase
        .from(`div_${division.toLowerCase()}`)
        .insert([{ group: groupName }])
        .select();
    if (error) {
        console.error("Error create group name:", error.message);
        throw new Error(error.message);
    }
}
export async function getGroups(division) {
    let data = [];
    let error = null;

    try {
        if (division === "A") {
            let result = await supabase.from("div_a").select("*");
            data = result.data || [];
            error = result.error;
        } else if (division === "B") {
            let result = await supabase.from("div_b").select("*");
            data = result.data || [];
            error = result.error;
        } else if (division === "C") {
            let result = await supabase.from("div_c").select("*");
            data = result.data || [];
            error = result.error;
        }

        if (error) {
            console.error("Error fetching data:", error);
        }
    } catch (err) {
        console.error("Error in getGroups function:", err);
    }

    return data;
}
export async function getUser(id) {
    let data = [];
    try {
        let result = await supabase
            .from("user_profiles")
            .select("*")
            .eq("userid", id);
        data = result.data;
    } catch (err) {
        console.error("Error in getUser function:", err);
    }
    return data[0];
    // Отримуємо перший (і, ймовірно, єдиний) запис
}
export async function getEmployers(group, shift) {
    let data = [];
    try {
        let result = await supabase
            .from("user_profiles")
            .select("*")
            .eq("division", group)
            .eq("charge", shift);

        data = result.data;
    } catch (err) {
        console.error("Error in getUser function:", err);
    }
    return data;
}

export async function createNewDay(formData) {
    const rawFormData = {
        date: formData.get("date"),
        startTime: formData.get("starttime")
            ? formData.get("starttime")
            : "00:00:00",
        endTime: formData.get("endtime") ? formData.get("endtime") : "00:00:00",
        issickleaveorvacation:
            formData.get("issickleaveorvacation") === "full"
                ? null
                : formData.get("issickleaveorvacation"),
        userId: formData.get("id"),
        extra: formData.get("extra") === "extra" ? true : null,
    };

    const { data, error } = await supabase
        .from("employee_statistics_table")
        .insert([
            {
                date: rawFormData.date,
                starttime: rawFormData.startTime,
                endtime: rawFormData.endTime,
                issickleaveorvacation: rawFormData.issickleaveorvacation,
                userid: rawFormData.userId,
                extra: rawFormData.extra,
            },
        ])
        .select();
    if (error) {
        console.error("Error create new day:", error.message);
        throw new Error(error.message);
    }
    return data; // Повертаємо нові дані
}
export async function getEmployersData(id) {
    let data = [];
    try {
        let result = await supabase
            .from("employee_statistics_table")
            .select("*")
            .eq("userid", id);
        data = result.data;
    } catch (err) {
        console.error("Error in getEmployersData function:", err);
    }
    return data;
}
export async function deleteGroup(id, group) {
    try {
        let error;
        if (group === "A") {
            const result = await supabase.from("div_a").delete().eq("id", id);
            error = result.error;
        } else if (group === "B") {
            const result = await supabase.from("div_b").delete().eq("id", id);
            error = result.error;
        } else if (group === "C") {
            const result = await supabase.from("div_c").delete().eq("id", id);
            error = result.error;
        }
        if (error) {
            throw error;
        }
    } catch (err) {
        console.error("Error in deleteGroup function:", err);
        return err;
    }
}
export async function deleteUserDate(id) {
    try {
        const { error } = await supabase
            .from("employee_statistics_table")
            .delete()
            .eq("id", id);
        if (error) {
            throw error;
        }
    } catch (err) {
        console.error("Error in deleteGroup function:", err);
        return err;
    }
}
