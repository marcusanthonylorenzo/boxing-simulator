const mongoose = require('mongoose');


//create tables and rows here
const BoxerSchema = new mongoose.Schema({

  //details 
  firstName: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  hometown: {
    type: String,
    required: true,
  },
  weightClass: {
    type: String,
    required: true,
  },


  //attributes
  con: {
    type: Number,
    required: true,
  },
  agr: {
    type: Number,
    required: true,
  },
  agi: {
    type: Number,
    required: true,
  },
  str: {
    type: Number,
    required: true,
  },
  def: {
    type: Number,
    required: true,
  },
  pow: {
    type: Number,
    required: true,
  },
  sta: {
    type: Number,
    required: true,
  },
  

  //private attributes, no underscore yet
  chin: {
    type: Number,
    required: true,
  },
  heart: {
    type: Number,
    required: true,
  },
  maxHp: {
    type: Number,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
  },  
  id: {
    type: Number,
    required: true,
  },


  //General scope
  win: {
    type: Number,
    required: true,
  },
  loss: {
    type: Number,
    required: true,
  },
  rank: {
    type: Number,
    required: true,
  },  
  champion: {
    type: Boolean,
    required: true,
  },

})

BoxerSchema.statics.engage


//create model, arg1 = table in db, arg2 = instance above
const UserModel = mongoose.model('user', BoxerSchema)
// const OpponentModel = mongoose.model('opponents', BoxerSchema);

//export access to client-side
module.exports = UserModel;
// module.exports = OpponentModel;