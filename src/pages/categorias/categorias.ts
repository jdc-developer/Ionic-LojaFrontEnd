import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public service: CategoriaService) {
  }

  ionViewDidLoad() {
    this.service.findAll().subscribe(resp => {
      this.items = resp;
    }, error => {});
  }

}
