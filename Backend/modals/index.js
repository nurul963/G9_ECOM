import sequelize from "../config/database.js";
import UserModal from "./user.modal.js";
const User=UserModal(sequelize);
export {
    User
}