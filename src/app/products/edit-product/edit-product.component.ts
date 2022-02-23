import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {slideIn} from '../../animations';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
// @ts-ignore
import moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {isEqual, cloneDeep} from 'lodash';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  animations: [slideIn]
})
export class EditProductComponent implements OnInit, OnDestroy {
  form: FormGroup;
  product: Product;
  productCopy = new Product();
  onDestroy = new Subject();
  productId: string;

  constructor(public activatedRoute: ActivatedRoute,
              public productService: ProductService,
              public router: Router,
              private snackBar: MatSnackBar,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy)).subscribe(params => {
      this.productService.getProductById(params.id).then((product: Product) => {
        this.product = product;
        this.productId = params.id;
        this.updateForm(product);
      });
    });
  }

  checkIfDataChange(): boolean {
    this.form.value.date = moment(this.form.value?.date).format('L');
    return this.equals(this.form.value, this.productCopy);
  }

  protected equals(a: any, b: any): boolean {
    return isEqual(a, b);
  }

  openSnackBar(): void  {
    this.snackBar.open(this.translate.instant('dialog.save-product'), 'Close', {duration: 1500});
  }

  ngOnDestroy(): void  {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: Validators.required}),
      date: new FormControl(null, {validators: Validators.required}),
      description: new FormControl(null, {validators: Validators.required}),
    });
  }

  updateForm(product: Product): void {
    this.form.patchValue({
      name: product?.name,
      date: new Date(product?.date),
      description: product?.description,
      id: product?.id
    });

    // Format cloned product date for validation button
    const clonedproduct = this.form.value;
    clonedproduct.date = moment(this.form.value?.date).format('L');
    this.productCopy = cloneDeep(clonedproduct);
  }

  updateProduct(): void  {
    this.product = new Product();
    this.product = {
      name: this.form.value?.name,
      date: moment(this.form.value?.date).format('L'),
      description: this.form.value?.description,
      id: this.productId
    };

    this.productService.updateProduct(this.product);

    this.openSnackBar();
    this.router.navigate(['/products']);
  }
}
