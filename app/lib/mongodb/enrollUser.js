import connectDatabase from "@mongodb/connectDatabase";
import UserSchema from "@schema/user";

const enrollUser = async (userData) => {
    let conn = await connectDatabase();

    const UserModel = conn.models.User || conn.model("User", UserSchema);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + '-' + currentDate.getFullYear(); 

    try{
        let user = await UserModel.findOne({username: userData.username});
        
        let lastEnrolledMonth;

        if(user.lastEnrolled){
            const lastEnrolledDate = user.lastEnrolled;
            lastEnrolledMonth = lastEnrolledDate.getMonth() + '-' + lastEnrolledDate.getFullYear();
        }

        Object.keys(userData).forEach((key) => {
            user[key] = userData[key];
        });

        user.lastEnrolled = currentDate;

        if(currentMonth != lastEnrolledMonth){
            user.pendingFees = user.pendingFees + 500;
        }

        await user.save();

        return user;
    }
    catch(err){
        console.log(err);
        return -1;
    }
}

export default enrollUser