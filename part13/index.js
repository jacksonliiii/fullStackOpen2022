require("dotenv").config();

const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();

const sequelize = new Sequelize(process.env.DATABASE_URL);

const main = async () => {
  try {
    // TODO: authenticate method does resolve with error or success
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    sequelize.close();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

main();

// class Blog extends Model {}

// Blog.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     author: {
//       type: DataTypes.TEXT,
//     },
//     url: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     title: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     likes: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//     },
//   },
//   {
//     sequelize,
//     underscored: true,
//     timestamps: false,
//     modelName: "Blog",
//   }
// );

// app.get("/api/blogs", async (req, res) => {
//   const blogs = await Blog.findAll();
//   res.json(blogs);
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
