import { signupInput } from "./user.validations";
import User, { UserCreationAttributes } from "./user.models";

export const signupService = async (data: signupInput) => {
  try {
    // Prepare the user data for creation
    const userData: UserCreationAttributes = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      city_id: data.city_id,
      is_verified: 0,
    };

    // Insert into the database
    const newUser = await User.create(userData);

    return {
      success: true,
      message: "User created successfully",
      data: { id: newUser.id },
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      message: "User creation failed",
    };
  }
};
