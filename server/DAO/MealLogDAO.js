class MealLogDAO {
    id = 0;
    userId = 0;
    name = "";
    calories = 0.0;
    fat = 0.0;
    carb = 0.0;
    date = "";
    constructor({id, userId, name, calories, fat, carb, date}) {
        if(!id || !userId || !name || !calories || !fat || !carb || !date) {
            const currentObject = {id, userId, name, calories, fat, carb, date};
            throw new Error(`    is missing fields. Current Object: ${JSON.stringify(currentObject)}`);
        }
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.calories = calories;
        this.fat = fat;
        this.carb = carb;
        this.date = date;
    }
}

module.exports = MealLogDAO;