import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {slideIn} from '../animations';
import {ProductService} from '../services/product.service';
import {finalize, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {Product} from '../models/Product';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {SharedDialogComponent} from '../shared/shared-dialog/shared-dialog.component';
import {Dialog, DialogMode} from '../models/Dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [slideIn]
})
export class ProductsComponent implements OnInit, OnDestroy {
  product: Product;
  isLoading = false;
  private onDestroy = new Subject();
  displayedColumns: Array<string> = ['position', 'name', 'date', 'description', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public http: HttpClient,
              public productService: ProductService,
              public router: Router,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.executeLoad();
  }

  executeLoad(): void {
    this.productService.getProducts().pipe(takeUntil(this.onDestroy), finalize( () => this.isLoading = true)).subscribe((products: Product[]) => {
      this.dataSource = new MatTableDataSource(products);
      this.isLoading = true;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log('error', err);
    });
  }

  editProduct(product: Product): void {
    this.router.navigate(['/edit-product', product.id], {queryParams: {id: product.id} });
  }

  confirm(): void {
    this.productService.deleteProduct(this.product.id);
    // this.executeLoad();
    this.snackBar.open(this.translate.instant('dialog.delete-product'), 'Close', {duration: 1500});
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(elem): void {
    this.product = elem;
    const dialog = new Dialog();
    dialog.data = elem;
    dialog.width = DialogMode.SMALL;
    dialog.title = this.translate.instant('dialog.confirmation-delete-title');
    dialog.content = this.translate.instant('dialog.delete-product-confirmation');

    if (dialog) {
      const dialogRef = this.dialog.open(SharedDialogComponent, {data: dialog, width: dialog.width});
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.confirm();
        }
      });
    }
  }

}
