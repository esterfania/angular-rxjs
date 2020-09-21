import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Acao, Acoes, AcoesAPI } from './modelo/acoes';
import { environment } from '../../environments/environment';
import { map, pluck, tap } from 'rxjs/operators';
const { api } = environment;
@Injectable({
  providedIn: 'root',
})
export class AcoesService {
  constructor(private http: HttpClient) {}

  getAcoes(valor?: string): Observable<Acoes> {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.http
      .get<AcoesAPI>(api + '/acoes', { params })
      .pipe(
        pluck('payload'),
        map((res: Acoes) => res.sort((a, b) => this.orderValuesCresc(a, b)))
      );
  }

  private orderValuesCresc(a: Acao, b: Acao) {
    if (a.codigo > b.codigo) return 1;
    if (a.codigo < b.codigo) return -1;
    return 0;
  }
}
