import connectDatabase from "@mongodb/connectDatabase";
import UserSchema from "@schema/user";

const makePayment = async (userData) => {
    if(!userData.paymentStatus)
        return -1;

    let conn = await connectDatabase();

    const UserModel = conn.models.User || conn.model("User", UserSchema);

    try{
        let user = await UserModel.findOne({username: userData.username});

        user.pendingFees = 0;

        await user.save();

        return user;
    }
    catch(err){
        console.log(err);
        return -1;
    }
}

export default makePayment;