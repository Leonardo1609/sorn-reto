import User from "../model/User"
import bcrypt from 'bcryptjs';


export default async () => {
    try {
        const adminValues = {
            username: process.env.ADMIN_USERNAME || 'sornadmin',
            password: process.env.ADMIN_PASSWORD || '12345678',
            role: 'admin'
        }

        const { username, password, role } = adminValues;

        const adminExists = await User.findOne({ 
            where: { username }
        })

        if( adminExists ) return;
    
        const salt = await bcrypt.genSalt( 10 );

        const hashedPass = await bcrypt.hashSync( password, salt );
    
        await User.create({ username, password: hashedPass, role });
    } catch (error) {
        console.log( error );
    }
}