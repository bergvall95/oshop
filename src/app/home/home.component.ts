import { CategoryService, Category } from './../category.service';
import { ProductId } from './../models/product';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: ProductId[];
  categories: Category[];
  isActive: string;
  placeholderImage: 'https://www.theyearinpictures.co.uk/images//image-placeholder.png';
  allSelected: boolean = true;
  constructor(private productService: ProductService, private categoryService: CategoryService) {
    productService.getAll().subscribe(products => this.products = products);
    categoryService.getCategories().subscribe(categories => this.categories = categories);
  }

  ngOnInit(): void {

  }
  private selectCategory(category: string){
    this.isActive = category;
  }

  private selectAll(){
    

  }
}
