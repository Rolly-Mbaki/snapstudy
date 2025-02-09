import { User } from "../models/user.model.js"

export const authCallBack = async (req, res) => {
    try {
        const { id, firstName, lastName, imageUrl } = req.body

        //check if user exists
        const user = await User.findOne({ clerkId: id })

        if (!user) {
            // Sign up
            await user.create({
                clerkId: id,
                fullName: `${firstName} ${lastName}`,
                imageUrl
            })
        }

        res.status(200).json({ success: true })
    } catch (error) {
        console.log("Error in auth callback", error)
        res.status(500).json({ messsage: "Internal server error", error })
    }
}