import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';
import { VueCookies } from 'vue-cookies'
import * as AWS from 'aws-sdk/global';
import VueRouter from 'vue-router';
import jwt_decode from 'jwt-decode';
import { ProfileModel } from '@/apis/models/Profile';
import { Store } from "vuex";
import { State } from "@/store/State"

interface token {
    username: string;
    exp: number;
    iat: number;
    sub: string;
    // whatever else is in the JWT.
  }
export default class CognitoHandler{
    

    static poolData = {
        UserPoolId: process.env.VUE_APP_AWS_COGNITO_USERPOOLID, // Your user pool id here
        ClientId: process.env.VUE_APP_AWS_COGNITO_ClIENTID
    };

    static sucess = false;

    static printEnv(){
        console.log(process.env.VUE_APP_AWS_COGNITO_ClIENTID) 
        console.log('hi')
    }

    static register(username: string ,name: string , password: string  ,email: string ,router : VueRouter ){
        
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
                router.push({ name: "verify" , params: { username }  })
                
            }
            //const cognitoUser = result| undefined.user ;           
        });
    }

    static login(username: string , password: string , router: VueRouter,cookies : VueCookies , store : Store<State>){
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
                const jwt = jwt_decode<token>(accessToken)
                const expireTime = jwt.exp - jwt.iat;
                cookies.set('accessToken', accessToken , expireTime);
                cookies.set('refreshToken' , result.getRefreshToken , expireTime);

                const profile : ProfileModel = { 
                    username : jwt.username,
                    sub: jwt.sub
                };

                store.commit('updateProfile', profile );
                router.push({name : "home"})
            },
        
            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },
        });
    }

    static confirmUser( username: string, confirmationCode: string ,router : VueRouter) {
        //user: { username: string; confirmationCode: string }
        //const { username, confirmationCode } = user;

        const userPool = new CognitoUserPool(CognitoHandler.poolData);
        const userData = {
          Username: username,
          Pool: userPool,
        };
        const cognitoUser = new CognitoUser(userData);
    
        return new Promise((resolve, reject) => {
         cognitoUser.confirmRegistration(confirmationCode, true, function (err, result) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
              router.push({name : "Login"})
            }
           });
        });
    }

    static resendAuthcode( username : string ){
        
        const userPool = new CognitoUserPool(CognitoHandler.poolData);

        const userData = {
            Username: username,
            Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);
    
        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
        });

    }

    static sendAuthcodeWhenForgotPassword(username : string ,router : VueRouter) {
        
        const userPool = new CognitoUserPool(CognitoHandler.poolData);
    
        // setup cognitoUser first
        const userData = {
            Username: username,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);
        // call forgotPassword on cognitoUser
        cognitoUser.forgotPassword({
            onSuccess: function (result) {
                alert("Mail Sent")
                router.push({ name: "verifyNewPassword" , params: { username }  })
            },
            onFailure: function (err) {
                console.log(err)
            },
        });
    }

    static verifyNewPassword(username: string ,verificationCode: string , newPassword: string , router : VueRouter){
        const userPool = new CognitoUserPool(CognitoHandler.poolData);
    
        // setup cognitoUser first
        const userData = {
            Username: username,
            Pool: userPool
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmPassword(verificationCode, newPassword,{ onSuccess: function (result) {
                        alert("change password success")
                        router.push({name : "Login"})
                    },
                onFailure: function (err) {
                        console.log(err)
                    } 
                }
            );
    }

}