import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {slideIn} from '../../animations';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [slideIn]
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: User;
  error: string = null;
  private onDestroy = new Subject();

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      lastName: new FormControl(null, {validators: [Validators.required]}),
      username: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required]}),
      phone: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]}),
    });
  }

  onRegister() {
    if (!this.form.valid) {
      return;
    }
    this.authService.register(this.form.value).pipe(takeUntil(this.onDestroy)).subscribe(data => {
      console.log('data', data);
      this.router.navigate(['/login']);
    }, errorMessage => {
      this.error = errorMessage;
    });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
