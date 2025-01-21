// app/lib/appwrite.ts
import { Client, Databases, Account, Models, ID } from "appwrite";

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const dealershipsId = process.env.NEXT_PUBLIC_APPWRITE_DEALERSHIPS_ID as string;
const customersId = process.env.NEXT_PUBLIC_APPWRITE_CUSTOMERS_ID as string;
const consultantsId = process.env.NEXT_PUBLIC_APPWRITE_CONSULTANTS_ID as string;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(projectId);

const databases = new Databases(client);
const account = new Account(client);

// Define the type for Customer Data
interface CustomerData  {
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    [key: string]: unknown;
}

// Function to create a customer document
const createCustomer = async (customerData: CustomerData): Promise<Models.Document> => {
    try {
        if (!databaseId || !customersId) {
            throw new Error("Database or Customer ids are not defined");
        }
        const response = await databases.createDocument(
            databaseId,
            customersId,
            "unique()",
            customerData
        );
        return response;
    } catch (e: unknown) {
        let errorMessage = "Error creating customer document";
        if(e instanceof Error){
            errorMessage = e.message;
        } else if (typeof e === "string") {
            errorMessage = e
        }
        console.error(errorMessage, e);
        throw new Error(errorMessage)
    }
};

// Function to create a new user
const createUser = async (email: string, password: string, name: string): Promise<Models.User<Models.Preferences>> => {
    try {
        const response = await account.create(
            "unique()",
            email,
            password,
            name
        );
        return response;
    } catch (error: unknown) {
        let errorMessage = "Error creating user";
        if(error instanceof Error){
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error
        }
        console.error(errorMessage, error);
        throw new Error(errorMessage)
    }
};

// Function to create a user session
const createUserSession = async (email: string, password: string): Promise<Models.Session> => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error: unknown) {
        let errorMessage = "Error creating session";
        if(error instanceof Error){
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error
        }
       console.error(errorMessage, error);
        throw new Error(errorMessage)
    }
};

// Function to check if a session exists
const checkSession = async (): Promise<boolean> => {
    try {
        await account.get();
        return true;
    } catch {
       return false;
    }
};

export { client, databases, createCustomer, databaseId, customersId, dealershipsId, checkSession, account, createUser, createUserSession, consultantsId, ID  };