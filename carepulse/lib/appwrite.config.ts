import exp from 'constants';
import * as sdk from 'node-appwrite';
const {
    PROJECT_ID,API_KEY,DATABASE_ID,PATIENT_COLLECTION_ID,DOCTOR_COLLECTION_ID,APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID:BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT:ENDPOINT
} = process.env

console.log(
    "project id:" ,PROJECT_ID,"\n api key:",
    API_KEY,"\n database id:",DATABASE_ID,"\n patient collection id:",
    PATIENT_COLLECTION_ID,"\n doctor collection id:",DOCTOR_COLLECTION_ID,
    "\n appointment collection id:",APPOINTMENT_COLLECTION_ID,
    "\n bucket id:",BUCKET_ID,"\n endpoint:",ENDPOINT   
)
console.log(process.env)

const client = new sdk.Client();
console.log("endpoint:",ENDPOINT)
console.log("project id:",PROJECT_ID)
console.log("api key:",API_KEY)

client
    .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
    .setKey(process.env.NEXT_PUBLIC_API_KEY!);

// ! is used to tell typescript that the value is not null or undefined


export const databases=new sdk.Databases(client);

export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export  const users = new sdk.Users(client);