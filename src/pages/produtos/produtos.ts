import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';

import { API_CONFIG } from './../../config/api.config';
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
    public prodServ: ProdutoService,
    public loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria = this.navParams.get('categoria');
    let loader = this.presentLoading();
    this.prodServ.findByCategoria(categoria).subscribe(response => {
      this.items = response['content'];
      loader.dismiss();
      this.loadImageUrls();
    }, error => {
      loader.dismiss();
    });
  }

  loadImageUrls() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i];
      this.prodServ.getSmallImageFromBucket(item.id).subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}prod${item.id}-small.jpg`;
      }, error => {});
    }
  }

  showDetail(id: string) {
    this.navCtrl.push('ProdutoDetailPage', { id: id });
  }

  presentLoading() {
    let loader = this.loadCtrl.create({
      content: 'Aguarde'
    });
    loader.present();
    return loader;
  }

  doRefrsh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
