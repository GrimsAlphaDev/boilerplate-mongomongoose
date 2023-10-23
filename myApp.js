require('dotenv').config();

// connect to mongoose database
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

var Person = mongoose.model("Person", personSchema);


// let Person;

const createAndSavePerson = (done) => {
  var Ginanjar = new Person({
    name: "Ginanjar",
    age: 29,
    favoriteFoods: ['Bakso', 'Mie', 'Nasi Goreng']
  });

  Ginanjar.save(function(err, data) {
    if (err) {
      console.log(err);
      done(err);
    } else {
      done(null, data);
    }
  });
};

var arrayOfPeople = [
  { name: "Frankie", age: 74, favoriteFoods: ["Del Taco"] },
  { name: "Sol", age: 76, favoriteFoods: ["roast chicken"] },
  { name: "Robert", age: 78, favoriteFoods: ["wine"] }
];

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, data) {
    if (err) {
      done(err);
    } else {
      data.favoriteFoods.push(foodToAdd);
      data.save(function(err, data) {
        if (err) {
          done(err);
        } else {
          done(null, data);
        }
      });
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet },{ new: true }, function(err, data) {
    if (err) {
      done(err);
    } else {
      done(null, data);
    }
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data){
    if(err){
      done(err);
    } else {
      done(null,data);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(err, data){
    if(err){
      done(err);
    } else {
      done(null, data);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  // Modify the queryChain function to find people who like the food specified by the variable named foodToSearch. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec(). Pass the done(err, data) callback to exec().
  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(error, people) {
    if(error) {
       done(error) 
    } else {
      done(null, people)
    }
  });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
