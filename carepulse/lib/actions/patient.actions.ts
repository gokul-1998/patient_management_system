import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
    console.log("Creating user:", user);
    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        console.log("User created:", newUser);
        console.log("bbbbbbbbbbbbbbbb");
        return newUser;
    } catch (error: any) {
        console.error("Error creating user:", error);
        if (error && error?.code === 409) {
            try {
                const existingUser = await users.list([
                    Query.equal('email', user.email)
                ]);
                console.log("Existing user found:", existingUser?.users[0]);
                return existingUser?.users[0];
            } catch (listError) {
                console.error("Error listing existing users:", listError);
                throw listError; // or handle this error further as needed
            }
        } else {
            throw error; // re-throw other errors for global handling
        }
    }
};
