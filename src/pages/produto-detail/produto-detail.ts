import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from './../../config/api.config';
import { CartService } from './../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public prodServ: ProdutoService,
    public cartServ: CartService) {
  }

  ionViewDidLoad() {
    let id = this.navParams.get('id');
    this.prodServ.findById(id).subscribe(response => {
      this.item = response;
      this.getImageUrlIfExists();
    }, error => {});
  }

  getImageUrlIfExists() {
    this.prodServ.getImageFromBucket(this.item.id).subscribe(response => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${this.item.id}.jpg`;
    }, error => {});
  }

  addToCart(produto: ProdutoDTO) {
    this.cartServ.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
