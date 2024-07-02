const LogType = {
  TASK_CREATE: 10, //created task
  TASK_CHANGE: 11, //changed task
  TASK_DELETE: 12, //deleted task
  TASK_COMPLETE: 13, //completed task
  TASK_STATE_CHANGE: 14, //changed task state from, to

  USER_JOIN: 20, //add user
  USER_LEAVE: 21, //leave project
  USER_CHANGE: 22, //changed user type from, to
  USER_KICKED: 23, //kicked user

  PROJECT_CHANGE: 30, //change project details
  PROJECT_STATE_CHANGE: 31, //change project state from, to

  NOTE: 40, //added note
  NOTE_TASK: 41, //added note to task

  fromValue: function (value) {
    return Object.keys(this).find((key) => this[key] === value);
  },
};

export default LogType;
