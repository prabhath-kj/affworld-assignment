import Secret from "../models/secret.js";
import CustomError from "../helpers/customError.js"


// Function to post secrets
export const postSecrets = async (req, res, next) => {
    try {
        const {_id:userId}=req.user
        const { message } = req.body;

        // Check if the message is empty
        if (!message || !message.trim()) {
            throw new CustomError('Secret message cannot be empty.', 400);
        }

        // Check if the message length exceeds a certain limit
        if (message.length > 255) {
            throw new CustomError('Secret message is too long.', 400);
        }

        // // Check if the user has already posted a secret
        const existingSecret = await Secret.findOne({ userId });

        if (existingSecret) {
            throw new CustomError('You can only post one secret.', 400);
        }

        // Create and save the new secret
        const newSecret = new Secret({
            userId,
            message,
        });

        await newSecret.save();

        // // Automatically delete the secret after 5 seconds
        // setTimeout(async () => {
        //     await Secret.findByIdAndDelete(newSecret._id);
        //     console.log(`Secret with ID ${newSecret._id} deleted.`);
        // }, 5000);

        res.status(201).json({ message: 'Secret posted successfully.' });
    } catch (error) {
        next(error)
    }
};

// Function to get all secrets
export const getAllSecrets = async (req, res, next) => {
    try {
        const secrets = await Secret.find({}, { _id: 0, userId: 0 }).populate('userId', 'username');

        if (!secrets || secrets.length === 0) {
            throw new CustomError('No secrets found.', 404);
        }

        res.status(200).json({ secrets });
    } catch (error) {
        next(error)
    }
};