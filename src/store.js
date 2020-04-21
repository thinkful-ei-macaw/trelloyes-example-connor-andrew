const { v4: uuidv4 } = require('uuid');

const cards = [{
  id: uuidv4(),
  title: 'Task One',
  content: 'This is card one'
},
{
  id: uuidv4(),
  title: 'Task Two',
  content: 'This is card two'
}];

const lists = [{
  id: uuidv4(),
  header: 'List One',
  cardIds: [1]
}];

module.exports = { 
  cards, 
  lists 
};