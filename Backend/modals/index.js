import sequelize from "../config/database.js";
import addressModal from "./address.model.js";
import cartModal from "./cart.model.js";
import categoryModal from "./category.modal.js";
import couponModal from "./coupon.model.js";
import orderModal from "./order.model.js";
import orderItemModal from "./orderItem.model.js";
import paymentModal from "./payment.model.js";
import productModal from "./product.modal.js";
import productImageModal from "./productImage.model.js";
import reviewModal from "./review.model.js";
import UserModal from "./user.modal.js";
import wishlistModal from "./wishlist.model.js";
const User=UserModal(sequelize);
const Product=productModal(sequelize);
const Category=categoryModal(sequelize);
const Address=addressModal(sequelize);
const Cart=cartModal(sequelize)
const Coupon=couponModal(sequelize);
const Order=orderModal(sequelize);
const OrderItem=orderItemModal(sequelize);
const Payment=paymentModal(sequelize);
const ProductImage=productImageModal(sequelize);
const Review=reviewModal(sequelize);
const Wishlist=wishlistModal(sequelize);
//Association
Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);

User.hasMany(Address);
Address.belongsTo(User);

User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Wishlist);
Wishlist.belongsTo(User);
Product.hasMany(Wishlist);
Wishlist.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

Order.hasOne(Payment);
Payment.belongsTo(Order);

User.hasMany(Review);
Review.belongsTo(User);
Product.hasMany(Review);
Review.belongsTo(Product);


export {
    User,
    Product,
    Category,
    Address,
    Cart,
    Coupon,
    Order,
    OrderItem,
    Payment,
    ProductImage,
    Review,
    Wishlist
}