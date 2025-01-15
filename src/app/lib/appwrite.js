// app/lib/appwrite.js
import { Client, Databases } from "appwrite";

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const dealershipsId = process.env.NEXT_PUBLIC_APPWRITE_DEALERSHIPS_ID;
const customersId = process.env.NEXT_PUBLIC_APPWRITE_CUSTOMERS_ID;


const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(projectId);

const databases = new Databases(client);

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


export { client, databases, createCustomer, databaseId, dealershipsId };