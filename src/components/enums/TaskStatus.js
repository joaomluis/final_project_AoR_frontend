const TaskStatus = {
  PLANNED: 10,
  IN_PROGRESS: 30,
  FINISHED: 50,
  PRESENTATION: 70,

  fromValue: function (value) {
    return Object.keys(this).find((key) => this[key] === value);
  },
};

export default TaskStatus;
