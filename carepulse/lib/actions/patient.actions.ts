import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"

export const createuser = async(user:CreateUserParams)=>{
    console.log("aaaaaaaaaaaaaaaa")
    try{
        const newUser=await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        )

    } catch (error:any){
        if (error && error?.code === 409){
            const existingUser=await users.list([
                Query.equal('email',[user.email])
            ])

            return existingUser?.users[0]
        }
    }

}