const AWS = require('aws-sdk');
const util = require('../utils/util');

AWS.config.update({
  region: 'us-west-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'eventManager-users';

async function updateUser(updatedUserInfo) {
  const { username, email, name, password, userDescription, userId } = updatedUserInfo;

  // Check if at least one attribute is provided
  if (!username && !email && !name && !password && !userDescription && !userId) {
    return util.buildResponse(400, { message: 'No attributes provided for update.' });
  }

  // Build the update expression and attribute values
  let updateExpression = 'SET';
  const expressionAttributeValues = {};

  if (username) {
    updateExpression += ' #username = :username,';
    expressionAttributeValues[':username'] = username;
  }

  if (email) {
    updateExpression += ' #email = :email,';
    expressionAttributeValues[':email'] = email;
  }

  if (name) {
    updateExpression += ' #name = :name,';
    expressionAttributeValues[':name'] = name;
  }

  if (password) {
    updateExpression += ' #password = :password,';
    expressionAttributeValues[':password'] = password;
  }

  if (userDescription) {
    updateExpression += ' #userDescription = :userDescription,';
    expressionAttributeValues[':userDescription'] = userDescription;
  }

  if (userId) {
    updateExpression += ' #userId = :userId,';
    expressionAttributeValues[':userId'] = userId;
  }

  // Remove the trailing comma
  updateExpression = updateExpression.slice(0, -1);

  const params = {
    TableName: userTable,
    Key: {
      username: updatedUserInfo.currentUsername
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeNames: {
      '#username': 'username',
      '#email': 'email',
      '#name': 'name',
      '#password': 'password',
      '#userDescription': 'userDescription',
      '#userId': 'userId'
    },
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: 'ALL_NEW'
  };

  try {
    const result = await dynamodb.update(params).promise();
    return util.buildResponse(200, { message: 'User updated successfully', updatedAttributes: result.Attributes });
  } catch (error) {
    console.error('Error updating user:', error);
    return util.buildResponse(500, { message: 'Internal server error' });
  }
}

module.exports.updateUser = updateUser;