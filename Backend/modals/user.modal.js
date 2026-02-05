import { DataTypes } from "sequelize";

const UserModal=(sequelize)=>{
    return sequelize.define('user',{
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.ENUM('ADMIN','USER','SELLER'),
            allowNull:false,
            defaultValue:'USER'
        },
        isActive:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false,
        }
    })

}
export default UserModal;