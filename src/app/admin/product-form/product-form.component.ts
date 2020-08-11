import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { Observable } from 'rxjs';
import { CategoryService, Category, CategoryId } from './../../category.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<CategoryId[]>;
  product: any = {
    price: '',
    imageUrl: '',
    name: '',
    title: ''
  };
  cats;
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute){
      this.categories$ = categoryService.getCategories();
      this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getProduct(this.id).subscribe(p => this.product = p);
    }

  }


  // tslint:disable-next-line: typedef
  save(product){
    if (this.id) {
      this.productService.update(this.id, product);
    }
    else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }
  // tslint:disable-next-line: no-trailing-whitespace
  
  delete() {
    if (!confirm('Are you sure you want to delete this product')) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
  }

}
