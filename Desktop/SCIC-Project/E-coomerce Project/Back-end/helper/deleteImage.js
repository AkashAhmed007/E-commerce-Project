const fs = require("fs").promises;

const deleteImage = async (userImagePath) => {
 try {
    await fs.access(userImagePath)
    await fs.unlink(userImagePath)
    console.log("User image deleted successfully")
 } catch (error) {
    console.error("User Image does not exist");
 }
   
}
module.exports = { deleteImage };
