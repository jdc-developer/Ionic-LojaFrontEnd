import { API_CONFIG } from './../../config/api.config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoDTO } from './../../models/produto.dto';
import { ProdutoService } from './../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public prodServ: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria = this.navParams.get('categoria');
    this.prodServ.findByCategoria(categoria).subscribe(response => {
      this.items = response['content'];
      this.loadImageUrls();
    }, error => {});
  }

  loadImageUrls() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.prodServ.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${item.id}-small.jpg`;
      }, error => {});
    }
  }

}
