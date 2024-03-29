import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValuesFromArray } from 'rxjs';

import { ConfigParamsService } from './config-params.service';
import { ConfigParams } from './../shared/models/config-params';
import { Filme } from './../shared/models/filme';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  editar(filme: Filme): Observable<Filme>{
    return this.http.put<Filme>(url + filme.id, filme);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }

  listar(config: ConfigParams): Observable<Filme[]> {
    const configParams = this.configService.configurarParametros(config);
    return this.http.get<Filme[]>(url, { params: configParams });
  }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  visualizar(id: number): Observable<Filme>{
    return this.http.get<Filme>(url + id);
  }
}