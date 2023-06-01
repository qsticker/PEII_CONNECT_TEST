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

    static registerTest(username: string , password: string  ,email: string ){
        

        const userPool = new CognitoUserPool(CognitoHandler.poolData);
        
        const attributeList = [];
        
        const dataEmail = {
            Name: 'email',
            Value: email,
        };

        
        const attributeEmail = new CognitoUserAttribute(dataEmail);
        
        attributeList.push(attributeEmail);
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
                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                //AWS.config.region = '<region>';
        
                //AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                //    IdentityPoolId: '...', // your identity pool id here
                //    Logins: {
                //        // Change the key below according to the specific region your user pool is in.
                //        'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': result
                //            .getIdToken()
                //            .getJwtToken(),
                //    },
                //});
        
                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
               
            },
        
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
        });
    }
}