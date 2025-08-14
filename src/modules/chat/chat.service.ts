import {
  successResponse,
  errorResponse,
} from "../../globals/utility/apiResponse";

export const testMethod = async () => {
  try {
    return successResponse("Retrieved successfully", { data: null });
  } catch (error) {
    console.error(error);
    return errorResponse("Error occurred", 404);
  }
};
