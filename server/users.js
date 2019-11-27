/**
 * @Author: Ali
 * @Date:   2019-10-06T11:29:31+02:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-11-27T06:57:33+01:00
 */
 
// these are some helper functions

const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existingUser = users.find(
    user => user.room === room && user.name === name
  );
  if (existingUser) {
    return { error: "Username is taken" };
  }
  const user = { id, name, room };
  users.push(user);
  return { user };
};
const removeUser = id => {
  //The findIndex() method returns the index of the first element in the array that //satisfies the provided testing function. Otherwise, it returns -1, indicating /that no element passed the test.
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    // The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements
    // var arrDeletedItems = array.splice(start[, deleteCount[, item1[, item2[, ...]]]]) . Optional: item1,item2 they will be inserted  ...
    return users.splice(index, 1)[0];
    //why [0] = the first element in the users's array??
  }
};
const getUser = id => users.find(user => user.id === id);
const getUsersInRoom = room => users.filter(user => user.room === room);
module.exports = { addUser, removeUser, getUser, getUsersInRoom };
