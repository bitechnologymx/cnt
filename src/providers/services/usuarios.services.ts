import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AppContants } from "../app.constants";
import { Usuario } from "../interfaces/usuario.interface";

@Injectable()
export class UsuariosProvider {

  URL_USERS_BY_ROLE:string = "appRole/usersByRole";
  URL_RECENT_ACTIVITY:string = "appUsuario/recentActivity";

  constructor(public http: HttpClient,public appContants: AppContants) {
    console.log('UsuariosServiceProvider Provider');
    console.log('---------------------------------------------------');
  }

  public usersByRole(idRole){
    let url = `${this.appContants.SERVER_URL}${this.URL_USERS_BY_ROLE}`;
    const httpParams = new HttpParams().append("idRole",idRole);
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => {
      console.log("UsuariosService : ");console.log(res);
      let usuarios:any = this.transformResponseUsuarios(res);
      return usuarios;
    });
  }

  public usersRecentActivity(){
    let url = `${this.appContants.SERVER_URL}${this.URL_RECENT_ACTIVITY}`;
    const httpParams = new HttpParams().append("limit","5");
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => {
      console.log("UsuariosService : ");console.log(res);
      let usuarios:any = this.transformResponseUsuarios(res);
      return usuarios;
    });
  }

  public transformResponseUsuarios(res){

    let usuarios:Usuario[] = new Array<Usuario>();
    res.forEach(function(data)
    {
      //console.log(data);
      let usuario:Usuario = new Usuario();

      usuario.idUsuario = data.idUsuario;
      usuario.nombreCompleto = data.nombreCompleto;
      usuario.imagen = data.imagen;
      usuario.estatusApp = data.estatusApp;

      usuarios.push(usuario);
    });

    return usuarios;
  }

}
