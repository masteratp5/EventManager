const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-west-1'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs');
const auth = require('../utils/auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'eventManager-users';

async function deleter(userInfo){

  if (!userInfo || !userInfo.username || !userInfo.email || !userInfo.name || !userInfo.password) {
    return util.buildResponse(400, {
      deletion: false,
      message: 'Error: Missing or incorrect request body.'
    });
  }

  const username = userInfo.username.toLowerCase().trim();
  const email = userInfo.email;
  const name = userInfo.name;
  const password = userInfo.password;

  const dynamoUser = await getUser(username);

  if (!dynamoUser) {
    return util.buildResponse(404, {
      message: 'Account not found. Deletion failed.'
    });
  }

  if (!bcrypt.compareSync(password, dynamoUser.password)) {
    return util.buildResponse(403, { message: 'password is incorrect'});
  }

  const deleteUserResponse = await deleteUser(username);

  if(!deleteUserResponse){
    return util.buildResponse(503, { message: 'Server Error. Please try again later.' });
  }

  return util.buildResponse(200, { username: username});
}

async function getUser(username) {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    }
  };

  return await dynamodb.get(params).promise().then(response => {
    return response.Item;
  }, error => {
    console.error('There is an error getting user: ', error);
  });
}

async function deleteUser(username) {
  const params = {
    TableName: userTable,
    Key: {
      username: username,
    }
  };

  return await dynamodb.delete(params).promise().then(() => {
    return true;
  }, error => {
    console.error('There is an error deleting user: ', error);
  });
}

module.exports.deleter = deleter;