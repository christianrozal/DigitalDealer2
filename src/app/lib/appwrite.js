// app/lib/appwrite.js
import { Client, Databases } from "appwrite";

const projectId = "6780c774003170c68252";
const databaseId = "67871d61002bf7e6bc9e";
const dealershipsId = "6787245c001ae86f7902";
const customersId = "678724210037c2b3b179";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(projectId);

const databases = new Databases(client);

// Function to get dealerships
const getDealerships = async () => {
    try {
        const response = await databases.listDocuments(
            databaseId,
            dealershipsId,
            []
        );
        return response.documents;
    } catch (e) {
        console.error("Error fetching dealerships", e);
        throw e;
    }
};

// Function to create a customer document
const createCustomer = async (customerData) => {
    try {
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
export { client, databases, getDealerships, createCustomer };