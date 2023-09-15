import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NgForm } from '@angular/forms';
import { CartItem } from '../../models/cart-item';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  name: any;
  price: any;
  id: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.activeRoute.snapshot.paramMap.get('id')) {
      this.id = this.activeRoute.snapshot.paramMap.get('id');
      this.name = this.cartService.getCartItemById(this.id)?.name;
      this.price = this.cartService.getCartItemById(this.id)?.price;
    }
  }

  addItem(itemData: NgForm) {
    if (this.activeRoute.snapshot.paramMap.get('id')) {
      this.cartService.modifyItem(
        <CartItem>itemData.value,
        this.activeRoute.snapshot.paramMap.get('id')
      );
    } else {
      this.cartService.addItemToCart(<CartItem>itemData.value);
    }
    this.router.navigate(['']);
  }
}
