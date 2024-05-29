// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Model/users');
const communitiesModel = require('../Model/communities');
const resourceModel = require('../Model/resources');

exports.verifyJWT = (req, res, next) => {
  const token = req.header('x-token'); // Extract token from authorization header
  console.log('token', token);
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  const jwtSecret = '!@#$%^&*()_+';
  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).send('Forbidden');
    }
    req.user = decoded.user;
    // Attach decoded user information to the request object
    console.log(req.user);
    next();
  });
};

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const user = await UserModel.create({
      email,
      password,
    });
    if (user) {
      res
        .status(201)
        .json({ message: 'User created successfully!', user: user });
    } else {
      return res.status(400).json({ error: 'Invalid request body' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (req.body.password === user.password) {
      const secret = '!@#$%^&*()_+';
      const payload = { user: { id: user._id } };
      const token = jwt.sign(payload, secret);
      console.log(token);
      return res.status(200).json({ token });
    } else {
      return res.status(401).send("Password doesn't match");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getUser = async (req, res) => {
  try {
    let existingUsers = await UserModel.find({}, { _id: 0, __v: 0 });
    if (existingUsers.length > 0) {
      res.status(200).json({
        status: 'Success',
        data: existingUsers,
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'No users found',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: 'Could not fetch users.Please try again',
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const { username, bio } = req.body;
    const userId = req.user.id; // Get user ID from JWT payload
    // Validate username or bio if needed (add your validation logic here)
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { username, bio },
      { new: true }
    ); // Update and return modified user
    if (!user) {
      return res.status(404).send('User not found');
    }
    return res
      .status(200)
      .json({ message: 'Profile updated successfully', user }); // Include updated user data in response
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};

exports.profile_picture = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    console.log(imageUrl);
    const userId = req.user.id; // Get user ID from JWT payload

    // Validate username or bio if needed (add your validation logic here)

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { imageUrl },
      { new: true }
    ); // Update and return modified user
    if (!user) {
      return res.status(404).send('User not found');
    }

    return res
      .status(200)
      .json({ message: 'Image uploaded successfully', user }); // Include updated user data in response
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};

exports.community = async (req, res) => {
  try {
    console.log(req.body);
    const community = await communitiesModel.create({
      name: req.body.name,
      description: req.body.description,
    });
    if (community) {
      res.status(201).json({
        message: 'Community created successfully!',
        community: community,
      });
    } else {
      return res.status(400).json({ error: 'Inalid request body' });
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
};

// delete community
exports.delete_community = async (req, res) => {
  const { communityId } = req.params;
  const adminuserId = req.user.id; // Get user ID from JWT payload (user information)
  try {
    const user = await UserModel.findById(adminuserId);

    console.log(user);
    if (user.username == 'admin') {
      const deletedUser = await communitiesModel.findByIdAndDelete({
        _id: communityId,
      });
      console.log(deletedUser);
      if (!deletedUser) {
        return res
          .status(404)
          .json({ error: 'User not found or deletion failed' });
      }

      res.status(200).json({ message: 'community deleted successfully' });
    } else {
      res.status(500).json({ error: 'your not admin' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user
exports.delete_user = async (req, res) => {
  const { userId } = req.params; // Get the user ID to be deleted from URL parameters
  const adminuserId = req.user.id; // Get user ID from JWT payload (user information)
  try {
    const user = await UserModel.findById(adminuserId);
    console.log(user);
    if (user.username == 'admin') {
      const deletedUser = await UserModel.findByIdAndDelete({ _id: userId });
      console.log(deletedUser);
      if (!deletedUser) {
        return res
          .status(404)
          .json({ error: 'User not found or deletion failed' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(500).json({ error: 'your not admin' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// admin can edit userInformation and community

exports.edit_user_details = async (req, res) => {
  const { userId } = req.params; // Get the user ID to be updated from URL parameters
  console.log('Updating user:', userId);

  const adminuserId = req.user.id; // Get user ID from JWT payload (user information)
  console.log('Admin user:', adminuserId);
  const updatedData = req.body;

  try {
    const user = await UserModel.findById(adminuserId);
    console.log(user);

    if (user.username === 'admin') {
      // Validate the update data here (if needed)

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updatedData,
        { new: true } // To return the updated user document
      );
      console.log(updatedUser);
      if (!updatedUser) {
        return res
          .status(404)
          .json({ error: 'User not found or update failed' });
      }
      res
        .status(200)
        .json({ message: 'User updated successfully', user: updatedUser });
    } else {
      res.status(500).json({ error: 'You are not authorized to update users' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// updating community by admin
exports.edit_community_details = async (req, res) => {
  const { communityId } = req.params; // Get the user ID to be updated from URL parameters
  console.log('Updating user:', communityId);

  const adminuserId = req.user.id; // Get user ID from JWT payload (user information)
  console.log('Admin user:', adminuserId);
  const updatedData = req.body;
  try {
    const user = await UserModel.findById(adminuserId);
    console.log(user);

    if (user.username === 'admin') {
      // Validate the update data here (if needed)
      const updatedUser = await communitiesModel.findByIdAndUpdate(
        communityId,
        updatedData,
        { new: true } // To return the updated user document
      );
      console.log(updatedUser);
      if (!updatedUser) {
        return res
          .status(404)
          .json({ error: 'User not found or update failed' });
      }
      res
        .status(200)
        .json({ message: 'User updated successfully', user: updatedUser });
    } else {
      res.status(500).json({ error: 'You are not admin' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// user can share resource
exports.share_resource = async (req, res) => {
  try {
    console.log(req.body);
    const resource = await resourceModel.create({
      title: req.body.title,
      type: req.body.type,
      link: req.body.link,
    });
    if (resource) {
      res.status(201).json({
        message: 'Resource shared successfully!',
        resource: resource,
      });
    } else {
      return res.status(400).json({ error: 'Inalid request body' });
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
};

// users to join community
exports.join_community = async (req, res) => {
  const { communityId } = req.params;
  console.log('manasa', communityId);
  const userId = req.user.id;
  console.log(userId);
  try {
    const community = await communitiesModel.findById(communityId);
    if (!community) {
      return res.status(404).json({ error: 'Community not found' });
    }
    const userId = req.user.id; // Assuming you have user ID from authentication
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    community.members.push(userId); // Add user ID to the community members array
    await community.save();
    return res.status(200).json({ message: 'Joined community successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  };
};
