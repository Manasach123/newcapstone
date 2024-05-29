const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/DiscussifyApp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

//Schema
const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Required field'],
    },
    password: {
      type: String,
      required: [true, 'Required field'],
    },
    username: { type: String },
    bio: { type: String },
    imageUrl: { type: String },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

//Model
const UserModel = mongoose.model('userdetails', usersSchema);

module.exports = UserModel;
