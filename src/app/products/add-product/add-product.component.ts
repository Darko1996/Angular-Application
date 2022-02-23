import {Component, OnInit} from '@angular/core';
import { slideIn } from '../../animations';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
// @ts-ignore
import moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  animations: [slideIn]
})
export class AddProductComponent implements OnInit {
  form: FormGroup;
  product: Product;

  constructor(private productService: ProductService,
              public router: Router,
              private snackBar: MatSnackBar,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: Validators.required}),
      date: new FormControl(null, {validators: Validators.required}),
      desc: new FormControl(null, {validators: Validators.required}),
    });
  }

  onAddProduct(): void {
    if (!this.form.value) {
      return;
    }

    this.product = new Product();
    this.product = {
      name: this.form.value.name,
      date: moment(this.form.value.date).format('L'),
      description: this.form.value.desc
    };

    this.productService.createProduct(this.product);
    this.snackBar.open(this.translate.instant('dialog.add-product'), 'Close', {duration: 1500});
    this.router.navigate(['/products']);
  }
}
