 
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
    api_key: process.env.CLOUDINARY_API_KEY?.trim(),
    api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

console.log("Cloudinary configuration:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
    api_key_loaded: !!process.env.CLOUDINARY_API_KEY,
    api_secret_loaded: !!process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.log("Local file path is missing");
            return null;
        }

        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
            timeout: 60000
        });

        // File has been uploaded successfully
        console.log(
            "File is uploaded on Cloudinary:",
            response.secure_url
        );

        return response;

    } catch (error) {

        // Print Cloudinary error details
        console.log("Cloudinary error message:", error.message);
        console.log("HTTP status:", error.http_code);
        console.log("Full Cloudinary error:");

        console.dir(error, { depth: null });

        console.log("Response headers:", error.response?.headers);
        console.log("Response data:", error.response?.data);

        return null;

    } finally {

        // Remove the locally saved temporary file
        if (localFilePath && fs.existsSync(localFilePath)) {
            try {
                fs.unlinkSync(localFilePath);
                console.log("Temporary file deleted successfully");
            } catch (deleteError) {
                console.log("File deletion error:", deleteError.message);
            }
        }
    }
};

export { uploadOnCloudinary };
