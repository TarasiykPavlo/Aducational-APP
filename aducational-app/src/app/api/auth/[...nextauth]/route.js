import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export const authOptions = {
    providers: [
        Providers.Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Ваш логін користувача. Наприклад, перевірка username і password
                const user = { id: 1, name: "Admin" }; // Замініть на свій логін процес

                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/login", // Налаштування custom login page
        signOut: "/auth/logout",
        error: "/auth/error", // Error code passed in query string as ?error=
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
