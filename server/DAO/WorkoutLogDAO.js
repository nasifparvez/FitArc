class WorkoutLogDAO {
  id = 0;
  userId= 0;
  name = "";
  reps = 0;
  sets = 0;
  time = 0;
  muscle = "";
  date = "";
  constructor({id, userId, name, time, reps, sets, muscle, date}) {
    if (!id || !name || !time || !reps || !sets || !muscle || !date || !userId ) {
      const currentObject = {id, name, time, reps, sets, muscle,date, userId};
      throw new Error(`WorkoutLogDAO is missing fields. Current object: ${JSON.stringify(currentObject)}`);
    }
    this.id = id;
    this.userId= userId;
    this.name = name;
    this.reps = reps;
    this.sets = sets;
    this.muscle = muscle;
    this.time = time;
    this.date = date;
  }
}

module.exports = WorkoutLogDAO;
