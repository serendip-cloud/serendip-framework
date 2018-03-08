import { UserModel } from "../models";
import { Collection, ObjectID } from "mongodb";
import { DbService, DbCollectionNames } from ".";



export class AuthService {

    private userCollection: Collection<UserModel>;

    private createRandomToken(length: number): string {

        return Math.random().toString().split('.')[1].substring(0, length);

    }

    constructor() {

        this.userCollection = DbService.collection<UserModel>(DbCollectionNames.Users);

    }

    public findUserById(userId: string): Promise<UserModel> {

        var objectId = new ObjectID(userId);

        return this.userCollection.findOne({ _id: objectId });

    }

    public findUserByMobile(mobile: string): Promise<UserModel> {

        return this.userCollection.findOne({ mobile: mobile });

    }



    public findUserByEmail(email: string): Promise<UserModel> {

        return this.userCollection.findOne({ email: email });

    }


    public async createPasswordResetToken(userId: string): Promise<string> {


        var token = this.createRandomToken(6);
        var objectId = new ObjectID(userId);


        await this.userCollection.findOneAndUpdate({ _id: objectId }, { "passwordResetToken": token });

        return token;


    }

    public static sendPasswordResetTokenWith(sendEmail: boolean, sendSms: boolean) {

        

    }


    public static changePassword(newPassword: string) {


    }

    public static lockAccount() {

    }

    public static unlockAccount() {

    }
}