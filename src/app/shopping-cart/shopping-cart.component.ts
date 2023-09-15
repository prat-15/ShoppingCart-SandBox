import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: Array<CartItem> = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe({
      next: (data: CartItem[]) => {
        this.cartItems = data;
      },
    });
  }

  navigateToAddItem() {
    this.router.navigate(['/add-item/']);
  }

  editItem(id: number) {
    let str = '/add-item/' + id;
    this.router.navigate([str]);
    //this.cartService.editItem(id);
  }

  removeItem(id: number) {
    this.cartService.removeItemFromCart(id);
  }
}
