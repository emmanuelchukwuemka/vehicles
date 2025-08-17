// src/modules/auth/auth.helpers.ts

import User from "../user/user.models";


export const getUserByAuthId = async (authUserId: number) => {
  try {
    const user = await User.findOne({
      //attributes: ["id", "first_name", "last_name", "email", "phone", "phone", "city_id"],
      where: { id: authUserId },
    });

    return user ? user.get({ plain: true }) : null;
  } catch (error) {
    console.error("Error fetching user by authId:", error);
    return null;
  }
};
