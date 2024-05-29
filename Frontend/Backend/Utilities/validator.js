exports.ValidateName = function (email) {
  if (email.trim().length > 0) {
    return true;
  }
  return false;
};
