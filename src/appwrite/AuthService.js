
import { Client, Account, ID } from 'appwrite';
import conf from '../conf/conf';

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                this.login({ email, password });
                return
            }
        } catch (error) {
            console.log("ERROR:: appwrite :: createaccount", error)
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("ERROR:: Appwrite:: login", error)
            throw new Error(error);
        }
    }

    async getCurrentUser() {
        try {
            const data = await this.account.get();
            return data;
        } catch (error) {
            console.log("ERROR:: account :: getUser", error)
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
            return true;
        } catch (error) {
            console.log("ERROR:: appwrite :: logout", error)
            return false;
        }
    }
}

export const authServices = new AuthService();