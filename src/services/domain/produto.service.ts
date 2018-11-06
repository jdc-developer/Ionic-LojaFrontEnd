import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_CONFIG } from './../../config/api.config';

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findByCategoria(categoria: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria}`)
    }
}