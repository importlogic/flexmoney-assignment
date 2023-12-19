import connectDatabase from '@mongodb/connectDatabase';
import UserSchema from '@schema/user';

const getUser = async (username) => {
    let conn = await connectDatabase();

    const UserModel = conn.models.User || conn.model('User', UserSchema);

    let user = await UserModel.findOne({username});

    if(user == null){
        user = new UserModel({username, pendingFees: 0});
        
        try {
            await user.save();
        }
        catch (err){
            console.log("❌ Error while saving user.")
            return -1;
        }
    }

    return user;
};

export default getUser;
