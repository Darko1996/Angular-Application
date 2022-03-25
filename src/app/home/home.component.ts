import {Component, OnDestroy, OnInit} from '@angular/core';
import { slideIn } from '../animations';
import {takeUntil} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';
import {Subject} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideIn]
})
export class HomeComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject();
  userIsAuthenticated = false;

  slides = [
    {image: './assets/images/slider/img1.jpg'},
    {image: './assets/images/slider/img2.jpg'},
    {image: './assets/images/slider/img3.jpg'},
    {image: './assets/images/slider/img4.jpg'}
  ];

  products = [
    {image: '/assets/images/products/product.jpg', name: 'Product 1', link: '/products'},
    {image: '/assets/images/products/product.jpg', name: 'Product 2', link: '/products'},
    {image: '/assets/images/products/product.jpg', name: 'Product 3', link: '/products'},
    {image: '/assets/images/products/product.jpg', name: 'Product 4', link: '/products'},
    {image: '/assets/images/products/product.jpg', name: 'Product 5', link: '/products'},
    {image: '/assets/images/products/product.jpg', name: 'Product 6', link: '/products'},
    {image: '/assets/images/products/product.jpg', name: 'Product 7', link: '/products'},
    {image: '/assets/images/products/product.jpg', name: 'Product 8', link: '/products'},
  ];

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authUser.pipe(takeUntil(this.onDestroy)).subscribe(data => {
      this.userIsAuthenticated = !!data;
      // console.log('userIsAuthenticated', this.userIsAuthenticated);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
