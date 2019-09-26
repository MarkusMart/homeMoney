import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.servise';
import { User } from 'src/app/shared/modules/user.model';
import { Router } from '@angular/router';
import { Promise } from 'q';

@Component({
  selector: 'wfm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  
  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email], [this.forbiddenEmails.bind(this)]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)]),
      'name': new FormControl(null,[Validators.required]),
      'agree': new FormControl(false,[Validators.required,Validators.requiredTrue])
    });
  }
  onSubmit(){
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.usersService.createNewUser(user).subscribe(() => {
      this.router.navigate(['/login'], {
        queryParams: {
          nowCanLogin: true
        }
      });
    });
  }
  forbiddenEmails(control: FormControl){
    return Promise((resolve,reject) => {
      this.usersService.getUserByEmail(control.value).subscribe((user: [User]) => {
      if(user.length>0){
        resolve({forbiddenEmail: true});
      }
      else {
        resolve(null);
      }
    });
    });
    
  }

}
