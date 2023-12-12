import { Client, Databases, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf";

class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }


    async createPsot({ title, content, featuredImage, userId, status, userName }) {
        try {
            return this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    status,
                    featuredImage,
                    userId,
                    userName
                }
            )
        } catch (error) {
            console.log("ERROR:: appwrite :: createPost", error)
        }
    }

    async updatePost($id, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                $id,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("ERROR:: service :: ")
        }
    }

    async deletePsot($id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                $id
            )
            return true;
        } catch (error) {
            console.log("ERROR :: service: deletePost", error)
            return false
        }
    }

    async getPost($id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                $id
            )
        } catch (error) {
            console.log("ERROR:: service :: getPost", error)
            return []
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("ERROR:: service :: getPosts", error)
            return []
        }
    }


    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error:: service:: uploadFile", error)
            return null;
        }
    }

    // getFile(fileId) {
    //     try {
    //         return this.bucket.getFile(
    //             conf.appwriteBucketId,
    //             fileId
    //         )
    //     } catch (error) {
    //         console.log("Error:: service:: getFile", error);
    //         return null;
    //     }
    // }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("ERROR:: service:: deleteFile::", error)
            return null;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Error:: service:: getFile", error);
            return null;
        }
    }

}

export const service = new Service();
