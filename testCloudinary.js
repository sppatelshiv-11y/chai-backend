 
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

try {
    const result = await cloudinary.uploader.upload(
        "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        {
            resource_type: "image"
        }
    );

    console.log("Image uploaded successfully:", result.secure_url);

} catch (error) {
    console.log("Upload error:", error.message);
    console.log("HTTP status:", error.http_code);
    console.log("Error details:", error.error);
}
