import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router'; 
import { PostService } from '../shared/Postdata.service';
import { User } from '../shared/user';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  constructor( private postservice:PostService,
    private router: Router,private toaster:NotificationService) {
      this.userdata;
     }
  public userdata:User;
  isLoading=false;
  ngOnInit(): void {
   // this.registerForm = this.formBuilder.group({
     // firstName: ['', Validators.required],
      //lastName: ['', Validators.required],
      //username: ['', Validators.required],
     // password: ['', [Validators.required, Validators.minLength(6)]]
  //});
    
  }
  //get f() { return this.registerForm.controls; }
 // registerForm: FormGroup;
  submitted = false;
  error: string=null;
  onSubmit() {
    if(this.signupForm.value.username.includes(" ") || this.signupForm.value.password.includes(" ") || this.signupForm.value.firstname.includes(" ") || this.signupForm.value.lastname.includes(" "))
    {
      this.toaster.showWarning("Please Remove Space from the field","Sign Up Error");
    }
    else{
    this.isLoading=true;
    this.postservice.register(this.signupForm.value.username, this.signupForm.value.password).subscribe(
      responseData=>{
      
        console.log("Please wait for the server to response");
        console.log(responseData);
        this.submitted = true;
        this.router.navigate(['/login']);
        this.toaster.showSuccess("You need to sign in with Credential","Sign Up Successfully Done");
        this.isLoading=false;
      },
      errorMessage=>{
        this.error=errorMessage;
        this.toaster.showError(this.error, "Error Occured!!");
        this.isLoading=false;
      }
    )
    

    // reset alerts on submit
   // this.alertService.clear();

    // stop here if form is invalid
    //if (this.registerForm.invalid) {
      //  return;
    //}
    //console.log(this.registerForm.value);

    
    }

}
  
  



}
