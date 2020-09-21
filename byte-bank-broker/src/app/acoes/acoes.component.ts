import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge, Observable } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

import { AcoesService } from './acoes.service';
import { Acoes } from './modelo/acoes';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent implements OnInit {
  acoesInput = new FormControl();
  todasAcoes$: Observable<Acoes>;
  filtroInput$: Observable<Acoes>;
  acoes$: Observable<Acoes>;

  constructor(private acoesService: AcoesService) {}

  ngOnInit(): void {
    this.getAcoes();
  }
  getAcoes() {
    this.todasAcoes$ = this.acoesService.getAcoes();
    this.filtroInput$ = this.acoesInput.valueChanges
      .pipe(debounceTime(3000))
      .pipe(
        switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
      );
    this.acoes$ = merge(this.todasAcoes$, this.filtroInput$);
  }
}
