import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from './../../shared/models/alerta';
import { Filme } from './../../shared/models/filme';
import { FilmesService } from './../../core/filmes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  readonly semFoto = "https://www.trt21.jus.br/sites/default/files/default_images/sem_foto%20%281%29.png"
  filme: Filme;
  id: number;

  constructor(private activatedRoute: ActivatedRoute,
              private filmesService: FilmesService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id)
  }

  excluir(): void {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certeza que deseja excluir, clique no botão Ok',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    }
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean)=>{
      if(opcao) this.filmesService.excluir(this.id).subscribe(()=> this.router.navigateByUrl('/filmes'));
    });      
  }

  private visualizar(): void{
    this.filmesService.visualizar(this.id).subscribe(filme =>{
      this.filme = filme;
    });
  }
}
