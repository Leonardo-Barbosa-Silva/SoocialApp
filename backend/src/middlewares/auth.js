import jwt from 'jsonwebtoken';
import usersModel from '../models/users/usersModel.js';


export default (req, res, next) => {
    try {

        // CHECK HEADER AUTH
        const headerAuth = req.headers.authorization

        if (!headerAuth) {
            return res.status(401).json({ message: "No token provided." })
        }

        // CHECK THE PARTS OF THE TOKEN
        const parts = headerAuth.split(' ')

        if (parts.length !== 2) {
            return res.status(401).json({ message: "Invalid token format." })
        }

        const [ scheme, token ] = parts

        // CHECK IF IS A BEARER TOKEN
        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ message: "Token malformatted." })
        }

        // FINAL CHECK
        jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "Token invalid." })
            }

            req.user = await usersModel.findById(decoded.id)

            next()
        })

    } catch (error) {
        console.log(`${error}`.red)
        return res.status(500).json({ error: "Internal server error." })
    }
}