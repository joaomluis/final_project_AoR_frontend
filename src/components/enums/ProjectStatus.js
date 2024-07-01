const ProjectStatus = {
  PLANNING: 10,
  READY: 20,
  IN_PROGRESS: 30,
  CANCELLED: 40,
  FINISHED: 50,

  fromValue: function (value) {
    return Object.keys(this).find((key) => this[key] === value);
  },
};

export default ProjectStatus;
