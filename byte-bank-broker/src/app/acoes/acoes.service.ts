import { HttpClient } from '@angular/common/http';
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

  getAcoes(): Observable<Acoes> {
    return this.http.get<AcoesAPI>(api + '/acoes').pipe(
      tap((res) => console.log(res)),
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
