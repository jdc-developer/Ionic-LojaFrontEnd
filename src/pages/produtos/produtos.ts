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

  items: ProdutoDTO[] = [];
  page = 0;

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
    this.prodServ.findByCategoria(categoria, this.page, 10).subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length - 1;
      loader.dismiss();
      this.loadImageUrls(start, end);
    }, error => {
      loader.dismiss();
    });
  }

  loadImageUrls(start: number, end: number) {
    for (let i = start; i < end; i++) {
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

  doRefresh(refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
