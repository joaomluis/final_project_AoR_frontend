const UserType = {
  ADMIN: 1,
  NORMAL: 10,
  MANAGER: 20,
  GUEST: 30,

  fromValue: function (value) {
    return Object.keys(this).find((key) => this[key] === value);
  },
};

export default UserType;
