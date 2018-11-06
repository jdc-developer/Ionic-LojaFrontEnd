import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { API_CONFIG } from '../../config/api.config';
import { CartItem } from './../../models/cart-item';
import { CartService } from './../../services/domain/cart.service';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartServ: CartService,
    public prodServ: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartServ.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

  loadImageUrls() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.prodServ.getSmallImageFromBucket(item.produto.id).subscribe(response => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${item.produto.id}-small.jpg`;
      }, error => {});
    }
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartServ.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartServ.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartServ.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartServ.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
