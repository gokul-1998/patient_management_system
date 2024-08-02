'use server'

import { ID, Query } from "node-appwrite";
import { BUCKET_ID, DATABASE_ID, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";

import { InputFile } from "node-appwrite/file";

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


export const getUser=async(userId:string)=>{
    try{
        const user=await users.get(userId);
        console.log("Raw user response:", user);

        return parseStringify(user);
    }
    catch (error){

        console.log("11111111111111111111111111")
        // console.log(error)
    }
}

export const registerPatient=async({identificationDocument,...patient}:RegisterUserParams)=>{
    try{
        let file;
        if(identificationDocument){
            const inputFile=InputFile.fromBuffer(identificationDocument?.get('blobFile') as Blob,
            identificationDocument?.get('fileName') as string
        )
        file = await storage.createFile(BUCKET_ID!,ID.unique(),inputFile)
        }
        console.log("aaaaaaaaaaaaaaa")
        console.log(
            {
                identificationDocumentId:file?.$id|| null,
                identificationDocumentUrl:`${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
            }
        )

        const newPatient= await databases.createDocument(DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId:file?.$id|| null,
                identificationDocumentUrl:`${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
                ...patient
            }
        )
        return parseStringify(newPatient);
    }
    catch(error){
        console.log(error)
    }
}