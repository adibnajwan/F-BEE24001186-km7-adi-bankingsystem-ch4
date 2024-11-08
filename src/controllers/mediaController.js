const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const imagekit = require('../libs/imagekit'); 

module.exports = {
    uploadImage: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ status: false, message: "No file uploaded" });
            }

            const { title, description } = req.body;
            const fileBase64 = req.file.buffer.toString('base64');

            const uploadedImage = await imagekit.upload({
                file: fileBase64,
                fileName: req.file.originalname,
            });

            const newImage = await prisma.image.create({
                data: {
                    title: title,
                    description: description,
                    url: uploadedImage.url  
                }
            });

            return res.status(200).json({
                status: true,
                message: 'Image uploaded and saved successfully',
                data: {
                    image: newImage
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Failed to upload image" });
        }
    }
};