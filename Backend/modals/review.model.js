import { DataTypes } from "sequelize";

const reviewModal = (sequelize) => {
    return sequelize.define('review', {
        rating: { type: DataTypes.INTEGER, allowNull: false },
        comment: DataTypes.TEXT
    })
}
export default reviewModal;