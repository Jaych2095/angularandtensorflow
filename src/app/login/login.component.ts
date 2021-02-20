import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../shared/Postdata.service';
import { User } from '../shared/user';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private postservice:PostService,private toaster:NotificationService) { }

  ngOnInit(): void {
  }
  @ViewChild('f') signupForm: NgForm;
  public userdata:User;
  successlogin=false;
  isLoading = false;
  submitted = false;
  error: string=null;
  onSubmit() {
    if(this.signupForm.value.username.includes(" ") || this.signupForm.value.password.includes(" "))
    {
      this.toaster.showWarning("Remove Space from the Field", "Login Error");
    }
    else{
     this.isLoading=true; 
      this.postservice.loggedin();
      this.postservice.login(this.signupForm.value.username, this.signupForm.value.password).subscribe(
        responseData=>{
          this.successlogin=true;
          console.log("Please wait for the server to response");
          console.log(responseData);
          
          this.submitted = true;
          this.isLoading = false;
          
          this.router.navigate(['/mainmodel']);
          this.toaster.showSuccess("Draw any Number And Let Computer to do predict","Login Successful");
        },
        errorMessage=>{
          this.error=errorMessage;
          this.isLoading=false
        }
      )
      
  
     
      }
    
    }
   
}

