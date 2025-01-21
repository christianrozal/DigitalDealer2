// app/lib/appwrite.js
import { Client, Databases, Account } from "appwrite";

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const dealershipsId = process.env.NEXT_PUBLIC_APPWRITE_DEALERSHIPS_ID;
const customersId = process.env.NEXT_PUBLIC_APPWRITE_CUSTOMERS_ID;


const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(projectId);

const databases = new Databases(client);
const account = new Account(client);

// Function to create a customer document
const createCustomer = async (customerData) => {
   try {
        if(!databaseId || !customersId){
            throw new Error("Database or Customer ids are not defined");
        }
        const response = await databases.createDocument(
          databaseId,
           customersId,
            "unique()",
            customerData
        );
        return response;
    } catch (e) {
        console.error("Error creating customer document", e);
        throw e;
   }
};


// Function to create a new user
const createUser = async (email, password, name) => {
   try {
        const response = await account.create(
            "unique()",
            email,
           password,
            name
        );
       return response;
    } catch (error) {
       console.error("Error creating user", error);
       throw error;
   }
};
// Function to create a user session
const createUserSession = async (email, password) => {
    try {
       const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error("Error creating session", error);
       throw error;
    }
};
// Function to check if a session exists
const checkSession = async () => {
   try {
        await account.get();
         return true;
     } catch (error) {
         return false;
     }
};

export { client, databases, createCustomer, databaseId, customersId, dealershipsId, checkSession, account, createUser, createUserSession };