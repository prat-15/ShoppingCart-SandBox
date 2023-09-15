import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Array<CartItem> = [];

  constructor() {}

  getCartItems(): Observable<Array<CartItem>> {
    return of(this.cartItems);
  }

  getCartItemById(id: number): CartItem {
    return <CartItem>this.cartItems.find((item) => item.id == id);
  }

  addItemToCart(item: CartItem): void {
    item.id =
      this.cartItems.length == 0
        ? 1
        : this.cartItems[this.cartItems.length - 1].id + 1;
    this.cartItems.push(item);
  }

  modifyItem(item: CartItem, idStr: string | null): void {
    if (idStr != null) {
      let id: number = parseInt(idStr);
      item.id = id;
      this.cartItems[this.cartItems.findIndex((item) => item.id == id)] = item;
    }
  }

  removeItemFromCart(id: number) {
    this.cartItems.forEach((item, index) => {
      if (item.id == id) this.cartItems.splice(index, 1);
    });
  }
}
