import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { CidadeDTO } from '../../models/cidade.dto';
import { API_CONFIG } from './../../config/api.config';

@Injectable()
export class CidadeService {

    constructor(public http: HttpClient) {
    }

    findAll(estado: string): Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado}/cidades`);
    }
}