import cron from "node-cron";
import { Op } from "sequelize";
import User from "../models/user.js";

 

// Cron job runs every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  try {
    const now = new Date();

    // Delete users whose OTP expired 10 minutes ago and are still unverified
    const deletedUsers = await User.destroy({
      where: {
        isVerified: false,
        otpExpiresAt: { [Op.lt]: now }, // Deletes expired unverified users
      },
    });

    if (deletedUsers > 0) {
      console.log(`Deleted ${deletedUsers} unverified users.`);
    }
  } catch (error) {
    console.error("Error running cron job:", error.message);
  }
});

console.log("Cron job scheduled to delete unverified users every 10 minutes.");
