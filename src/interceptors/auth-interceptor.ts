import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();
        
        let N = API_CONFIG.baseUrl.length;
        let requestAPI = req.url.substring(0, N) == API_CONFIG.baseUrl;

        if (localUser && requestAPI) {
            const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${localUser.token}`)})
            return next.handle(authReq)
        }

        return next.handle(req);
    }

}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
}