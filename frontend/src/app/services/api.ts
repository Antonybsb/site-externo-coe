import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private apiUrl = 'http://localhost:1337/api';
  constructor(private http: HttpClient) { }

  getModalidades(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/modalidades?populate=*&sort=nome:asc`);
  }

  // Método para buscar UM esporte pelo slug (Ex: ?filters[slug][$eq]=futebol)
  getModalidadePorSlug(slug: string) {
    // Strapi usa essa sintaxe complexa para filtrar: filters[campo][$eq]=valor
    const url = `${this.apiUrl}/modalidades?filters[slug][$eq]=${slug}&populate=*`;
    return this.http.get<any>(url);
  }

  // Busca banners populando a imagem e ordenando (supondo campo 'ordem')
  getBanners() {
    return this.http.get<any>(`${this.apiUrl}/banners?populate=*&sort=ordem:asc`);
  }

}
