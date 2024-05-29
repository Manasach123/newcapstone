const mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/DiscussifyApp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const communitiesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const communitiesModel = mongoose.model('community', communitiesSchema);

module.exports = communitiesModel;
