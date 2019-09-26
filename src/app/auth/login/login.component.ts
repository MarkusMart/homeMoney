import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.servise';
import { User } from 'src/app/shared/modules/user.model';
import { Message } from 'src/app/shared/modules/message.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'wfm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  message: Message;
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  private showMessage(message: Message){
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    },5000);
  }
  ngOnInit() {
    this.message = new Message('danger',"");
    this.route.queryParams.subscribe((params: Params)=>{
      if(params['nowCanLogin']) {
        this.showMessage({text:"Ви можете зайти в систему", type:"success"});
      }
      else if(params['accessDenied']){
        this.showMessage({
          text: 'Для роботи з системою вам потрібно увійти',
          type: "warning"
        })
      }
    });
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required,Validators.email]),
      'password': new FormControl(null, [Validators.required,Validators.minLength(6)])
    });
    
  }
  onSubmit(){
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email).subscribe((user : [User])=>{
      if(user.length > 0){
        if(user[0].password === formData.password){
          this.message.text = '';
          window.localStorage.setItem('user',JSON.stringify(user[0]));
          this.authService.login();
          console.log("yes");
          this.router.navigate(['/system','bill']);
        }
        else{
          this.showMessage({text:"Incorrect password",type:"danger"});
        }
      }
      else{
        this.showMessage({text:"Incorrect email",type:"danger"});
      }
    });
  }

}
