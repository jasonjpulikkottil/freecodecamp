require('dotenv').config();
const mongoose=require('mongoose');
const { Schema } = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema ({
  name:{
    type:String,
    required:true
  },
  age:Number,
  favoriteFoods:[String]
  
})
const Person = mongoose.model('Person',personSchema);


const createAndSavePerson = (done) => {
  const person = new Person({
    name:'Jason',
    age:25,
    favoriteFoods:['pizza','noodles']
  })
  person.save(function(err, data) {
    if(err){
      done(err);
      return;
    }
  console.log(data);
    done(null,data);
});
 
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,function (err,data) {
    if(err) return;
    
  done(null,data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},function(error,peopleFound){
    if(error) return;
    
  done(null,peopleFound);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},function(error,f){
    if(error) return;
    
  done(null,f);
  })
};

const findPersonById = (personId, done) => {
 Person.findById({_id: personId},function(error,i){
    if(error) return;
    
  done(null,i);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
Person.findById(personId,function(error,person){
  if(error) return;
  person.favoriteFoods.push(foodToAdd);
   person.save(function(err, data) {
    if(err){
      done(err);
      return;
    }
  console.log(data);
    done(null,data);
});
})
  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOneAndUpdate({name: personName},{age: ageToSet},{ new: true },function(err, data) {
    if(err){
      done(err);
      return;
    }
  console.log(data);
    done(null,data);
})
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId,function(err, data) {
    if(err){
      done(err);
      return;
    }
  console.log(data);
    done(null,data);
})
};

const removeManyPeople = (done) => {
  const nameToRemove = {name:"Mary"};
 Person.remove(nameToRemove,function(err, data) {
    if(err){
      done(err);
      return;
    }
  console.log(data);
    done(null,data);
})
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
Person.find({favoriteFoods: foodToSearch})
  .sort({name:'asc'})
  .limit(2)
  .select({age:0})
  .exec(function(err, data) {
    if(err){
      done(err);
      return;
    }
  console.log(data);
    done(null,data);
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
