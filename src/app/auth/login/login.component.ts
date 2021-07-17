import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { slideIn } from '../../animations';
import { AuthService } from '../../services/auth.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [slideIn]
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: User;
  error: string = null;
  private onDestroy = new Subject();

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]})
    });
  }

  onLogin() {
    this.user = new User();
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;

    if (!this.form.valid) {
        return;
    }
    this.authService.login(this.form.value).pipe(takeUntil(this.onDestroy)).subscribe(data => {
      console.log('data', data);
      this.router.navigate(['/events']);
    }, errorMessage => {
      this.error = errorMessage;
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
