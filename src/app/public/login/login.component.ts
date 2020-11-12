import { AlertModalService } from './../../shared/alert-modal.service';
import { Usuario } from './../model/usuario';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './util.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  usuario: Usuario



  constructor(
    private authService: AuthService,
    private route: Router,
    private fb: FormBuilder,
    private modal: AlertModalService,

    ) { }

    ngOnInit(): void {
       this.formulario = this.fb.group({
        usuario: [null],
        senha: [null]
      })



    }

    onSubmit(){
      this.autenticar();
    }

    autenticar(){

      this.usuario = this.mapperUsuario(this.formulario, this.usuario);
      this.authService.autenticar(this.usuario)
      .subscribe(
        response => {
          this.route.navigate([""])
        },
        (error:any) => this.modal.showAlertDanger(error.error.msg)
        );
  }

  mapperUsuario(formulario, usuario): Usuario{
    usuario = {
      usuario: formulario.get('usuario').value,
      senha: formulario.get('senha').value
    }
    return usuario;
  }


}
