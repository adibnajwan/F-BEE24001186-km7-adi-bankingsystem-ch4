const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const imagekit = require('../libs/imagekit');

module.exports = {

    getImages: async (req, res) => {
        try {
            const images = await prisma.image.findMany();
            return res.status(200).json({ status: true, data: images });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Failed to retrieve images" });
        }
    },

    getImageById: async (req, res) => {
        try {
            const { id } = req.params;
            const image = await prisma.image.findUnique({ where: { id: parseInt(id) } });
            if (!image) return res.status(404).json({ status: false, message: "Image not found" });

            return res.status(200).json({ status: true, data: image });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Failed to retrieve image" });
        }
    },

    deleteImage: async (req, res) => {
        try {
            const { id } = req.params;
            const image = await prisma.image.delete({ where: { id: parseInt(id) } });
            return res.status(200).json({ status: true, message: "Image deleted successfully", data: image });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Failed to delete image" });
        }
    },

    updateImage: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description } = req.body;

            const updatedImage = await prisma.image.update({
                where: { id: parseInt(id) },
                data: { title, description }
            });

            return res.status(200).json({ status: true, message: "Image updated successfully", data: updatedImage });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Failed to update image" });
        }
    },

    uploadImage: async (req, res) => {
        try {
            const { title, description } = req.body;
            const imageFile = req.file; 

            const uploadedImage = await imagekit.upload({
                file: imageFile.buffer, 
                fileName: title,
                folder: "/banking-system/images" 
            });

            const newImage = await prisma.image.create({
                data: {
                    title,
                    description,
                    url: uploadedImage.url, 
                    imagekitId: uploadedImage.fileId 
                }
            });

            return res.status(200).json({
                status: true,
                message: "Image uploaded successfully",
                data: newImage
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ status: false, message: "Failed to upload image" });
        }
    }
};
