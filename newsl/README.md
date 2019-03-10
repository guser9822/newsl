# newsl

This is a simple REST API for managing user registration and retrieval for a newsletter service. For sake of semplicity, the database containg the users registered to the newsletter it's an array. The API was made entirely with NodeJS and it's libraries and no other third party software.

# Usage

The REST API consist of four basic endpoints which consumes *application/json* as content-type (otherwise *415* is given as http error code) and respond with this object:

```
{
	result : 'ok' or 'ko'
	message : 'Description of the response.'
	payload : 'Only all-users and get-by-email api have also a payload field for containing the result.'
}
```

* **/hello** (*GET*) which is used to greet.
* **/newsletter/signup** (*POST*) which permits the user registration given the following item as input :
	```
	{
		name: 'Robert',
		surname: 'De Niro',
		email: 'robert.deniro@iml.com',
		birthDate: '17/08/1943',
		cap: '77822'
	}
	```
	The following http codes are given back as response :
	* 200 : Success, user registered.
	* 422 : Validation error on one the field.
* **/newsletter/users** (*GET*) which return the list of all the users registered to the newsletter service.
	The following http codes are given back as response :
	* 200 : Success, the payload field in the response is filled with all the users found.
	* 404 : Erro, no user found.
* **/newsletter/getbyemail** (*POST*) which let you search a registered user by his/her email given the follwing item as input :
	```
	{
		email: 'email@address.com'
	}
	```
	The following http codes are given back as response :
	* 200 : Success, payload field in the response will contain the user found.
	* 422 : Error due to email address validation.

The API can be fully tested using /test/apitest.js script.

# Notes

The API is meant to be execute on localhost:8080 and it supports *https*