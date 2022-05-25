const crypto = require('crypto');

class User{
    constructor(id, {first_name, last_name}){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
    }
}

let users = {};

const root = {

  hello: async () => {
    return 'Hello world!';
  },
  getUser: async ({ id }, context) => {
    const { db } = await context();
    return db.collection("users").findOne({ id });
  },

  listUsers: async (_, context) => {
    const { db } = await context();
    return db
      .collection("users")
      .find()
      .toArray();
  },
  createUser: async ({input}, context) => {
    const id = crypto.randomBytes(10).toString('hex');
    users[id] = input;
    return db.collection("users").insertOne(new User(id, input))
  },
  editUser: async ({ id, name, email }, context) => {
    const { db } = await context();

    return db
      .collection("users")
      .findOneAndUpdate(
        { id },
        { $set: { name, email } },
        { returnOriginal: false }
      )
      .then(resp => resp.value);
  } 
}; 
module.exports = root;