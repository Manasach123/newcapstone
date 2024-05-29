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
const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

//Model
const resourceModel = mongoose.model('resource', resourceSchema);

module.exports = resourceModel;
