 
import { asyncHandler } from "../utils/aysncHndler.js";
import { ApiError } from "../utils/api error.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudnery.js";
import { ApiResponse } from "../utils/api response.js";

const registerUser = asyncHandler(async (req, res) => {

    // Get user details from frontend

    // validation - not empty
    
    // Check if user already exist: username, email

    // Check for image, check for avatar

    // Upload them to Cloudinary, avatar

    // Create user object - create entry in DB

    // Remove password and refreshToken field from response

    // Check for user creation

    // Return response

    const { username, email, fullName, password } = req.body;

    console.log("email:", email);

    // Validation - not empty fields
    if (
        [username, email, fullName, password].some(
            (field) => !field || !field.trim()
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // Check if user already exists
    const exitUser = await User.findOne({
        $or: [{ username: username }, { email: email }]
    });

    if (exitUser) {
        throw new ApiError(
            409,
            "User with email or username already exists"
        );
    }

    // Check for image, check for avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    console.log("Avatar path:", avatarLocalPath);
    console.log("Cover image path:", coverImageLocalPath);

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Upload them to Cloudinary, avatar
    const avatarUploadResponse = await uploadOnCloudinary(avatarLocalPath);

    if (!avatarUploadResponse) {
        throw new ApiError(400, "Avatar file upload failed");
    }

    let coverImageUploadResponse = null;

    if (coverImageLocalPath) {
        coverImageUploadResponse = await uploadOnCloudinary(
            coverImageLocalPath
        );
    }

    // Create user object - create entry in DB
    const user = await User.create({
        fullName,
        avatar: avatarUploadResponse.secure_url,
        coverImage: coverImageUploadResponse?.secure_url || "",
        email,
        password,
        username: username.toLowerCase()
    });

    // Remove password and refreshToken field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // Check for user creation
    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    // Return response
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        )
    );

});

export {
    registerUser
};
