import Jwt from "jsonwebtoken";

export const generateToken = async (payload: object) => {
    if (process.env.JWT_SECRET !== undefined) {
        const token = await Jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '90d' }
        )
        return token;
    }
};


// export const verifyJwt = <T>(token: string): T | null => {
//     try {
//         const decoded = Jwt.verify(token, process.env.JWT_SECRET) as T;
//         return decoded;
//     } catch (error) {
//         return null;
//     }
// };


