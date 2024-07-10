const UserType = {
  ADMIN: 1,
  NORMAL: 10,
  MANAGER: 20,
  GUEST: 30,
  PROPOSED: 40,
  INVITED: 50,

  fromValue: function (value) {
    return Object.keys(this).find((key) => this[key] === value);
  },

  fromName: function (name) {
    return this[name];
  },
};

export default UserType;
