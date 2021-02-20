import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Injectable } from "@angular/core";
import {Observable, throwError,BehaviorSubject} from "rxjs";
import {catchError} from "rxjs/operators";

import {User} from "./user";
interface AuthResponseData{
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean
}
@Injectable()

export class PostService{
  
    public user:User[]=[];
    private islogin:boolean=false;
    userdata = new BehaviorSubject<User>(null)
    private key:any='AIzaSyCqZy3QbPmMa1lHe6E5x0WL50Csl1l4FbI';
    constructor(private http:HttpClient)
    {

    }
   
   // public register(userdata:User)
    //{
      //  return this.http.post('https://reqres.in/api/users', '{ "first_name": userdata.firstName, "last_name": userdata.lastName }')
    //}
    isAuthenticated()
    {
        const promise=new Promise(
            (resolve, reject)=>{
                setTimeout(()=>{
                    resolve(this.islogin);
                },800)
            }
        );
        //this.loggedin();
        return promise;
    }
    public register(email:string, password:string)
    {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.key,
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe((catchError(this.handleerror)));
    }
    public login(email:string, password:string)
    {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.key,
        {
            email:email,
            password:password,
            returnSecureToken:true
        })
        .pipe((catchError(this.handleerror)));
    }
   
    private handleerror(errres:HttpErrorResponse)
    {
        let errorMessage = 'An unknown error occured!';
        if(!errres.error || !errres.error.error){
            return throwError(errorMessage);
        }
        switch(errres.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage='This email is already exist';
        }
        return throwError(errorMessage);
        
    }
    loggedin()
    {
        this.islogin=true;
    }
    loggedout()
    {
        this.islogin=false;
    }
    
}