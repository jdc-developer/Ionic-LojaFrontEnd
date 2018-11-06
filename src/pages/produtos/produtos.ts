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
    }, error => {});
  }

}
