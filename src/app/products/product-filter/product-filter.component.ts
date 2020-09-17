import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
 categories$;
 @Input('category') category;

  constructor(categoryService: CategoryService) {
    categoryService.getCategories().subscribe(categories => this.categories$ = categories);
  }
}
