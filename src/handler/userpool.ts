import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';

import * as AWS from 'aws-sdk/global';

export default class CognitoHandler{
    static poolData = {
        UserPoolId: process.env.VUE_APP_AWS_COGNITO_USERPOOLID, // Your user pool id here
        ClientId: process.env.VUE_APP_AWS_COGNITO_ClIENTID
    };

    static printEnv(){
        console.log(process.env.VUE_APP_AWS_COGNITO_ClIENTID) 
        console.log('hi')
    }

    static register(username: string ,name: string , password: string  ,email: string ){
        

        const userPool = new CognitoUserPool(CognitoHandler.poolData);
        
        const attributeList = [];
        
        const dataEmail = {
            Name: 'email',
            Value: email,
        };

        const dataName = {
            Name: "name",
            Value: name,
        }
        
        const attributeEmail = new CognitoUserAttribute(dataEmail);
        const attributeName = new CognitoUserAttribute(dataName);

        attributeList.push(attributeEmail);
        attributeList.push(attributeName)
        //attributeList.push(attributePhoneNumber);
        
        userPool.signUp(username, password, attributeList, [] , function(
            err,
            result
        ) {
            let  cognitoUser  = undefined;
            if (err) {
                alert(err.message || JSON.stringify(err));
                
            }
            if( result == undefined){
                alert( "result is undefined")
            }else{
                cognitoUser = result.user ;
                console.log('user name is ' + cognitoUser.getUsername());
            }
            //const cognitoUser = result| undefined.user ;           
        });
    }

    static login(username: string , password: string){
        const authenticationData = {
            Username: username,
            Password: password,
        };
        const authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        const userPool = new CognitoUserPool(CognitoHandler.poolData);

        const userData = {
            Username: username,
            Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                const accessToken = result.getAccessToken().getJwtToken();
                console.log( accessToken )
                
            },
        
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
        });
    }
}