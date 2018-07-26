import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AppContants } from "../app.constants";
import { Usuario } from "../interfaces/usuario.interface";
import { Role } from "../interfaces/role.interface";
import { Menu } from "../interfaces/menu.interface";

@Injectable()
export class AutenticacionProvider {

  URL_AUTH:string = "appUsuario/auth";
  URL_USERS_ALL:string = "appUsuario/all";
  URL_USER_IMAGE:string = "appUsuario/image";
  URL_LOGIN_UPDATE:string = "appUsuario/updateLogin";

  constructor(public http: HttpClient,public appContants: AppContants) {
    console.log('AutenticacionProvider Provider');
    console.log('---------------------------------------------------');
  }

  public getImage(username){
    let url = `${this.appContants.SERVER_URL}${this.URL_USER_IMAGE}`;
    const httpParams = new HttpParams().append("username",username);
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( res => { console.log(url + " : " + res); return res; });
  }

  public updateLogin(idUser){
    let url = `${this.appContants.SERVER_URL}${this.URL_LOGIN_UPDATE}`;
    const httpParams = new HttpParams().append("idUser",idUser);
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( res => { console.log(url + " : " + res); return res; });
  }

  public authentication(username,password){
    let url = `${this.appContants.SERVER_URL}${this.URL_AUTH}`;
    const httpParams = new HttpParams().append("username",username).append("password",password);
    const headers = this.appContants.reqHeadersPost();

    return this.http.post(url, httpParams, { headers:headers,responseType:"json" })
    .map( (res:any) => {
      //console.log("Service : ");console.log(res);
      let usuario:Usuario = this.transformResponseUsuario(res);
      return usuario;
    });
  }

  public transformResponseUsuario(res){
    let usuario:Usuario = new Usuario();

    usuario.idUsuario = res.idUsuario;
    usuario.nombreUsuario = res.nombreUsuario;
    usuario.nombreCompleto = res.nombreCompleto;
    usuario.password = res.password;
    usuario.imagen = res.imagen;
    usuario.telefono = res.telefono;
    usuario.email = res.email;
    usuario.activo = res.activo == 1 ? true : false;
    usuario.estatusApp = res.estatusApp;
    usuario.ultimoIngreso = res.ultimoIngreso;
    usuario.roles = new Array<Role>();

    for( let appRole of res.appRoles ){
      let role:Role = new Role();
      role.idRole = appRole.idRole;
      role.descripcion = appRole.descripcion;
      role.nombre = appRole.nombre;
      role.menus = new Array<Menu>();

      for( let appMenu of appRole.appMenus ){
        let menu:Menu = new Menu();
        menu.idMenu = appMenu.idMenu;
        menu.accion = appMenu.accion;
        menu.descripcion = appMenu.descripcion;
        menu.icono = appMenu.icono;
        menu.prioridad = appMenu.prioridad;
        menu.titulo = appMenu.titulo;

        role.menus.push(menu);
      }
      usuario.roles.push(role);
    }

    return usuario;
  }

  public getAllUsers(){
    let url = `${this.appContants.SERVER_URL}${this.URL_USERS_ALL}`;
    //let url = 'https://jsonplaceholder.typicode.com/posts/1';
    //const headers = this.appContants.reqHeadersPost();
    //let formData = new FormData().append('username', username);

    const req = this.http.post(url, {})
    .subscribe( res => { console.log(res); }, err => { console.log("Error occured"); } );

    //this.http.get(url).subscribe(data => {console.log(data);});

    /**const req = this.http.post('http://jsonplaceholder.typicode.com/posts', {title: 'foo',body: 'bar',userId: 1})
    .subscribe( res => { console.log(res); }, err => { console.log("Error occured"); } );*/

    //return this.httpClient.post( url, new FormData(), { headers:headers,responseType:"json" } );
  }
}
