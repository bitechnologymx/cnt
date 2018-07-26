import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { shareReplay, map } from 'rxjs/operators';

import { InformacionCliente } from "../../providers/interfaces/informacionCliente.interface";

const CACHE_SIZE = 1;

@Injectable()
export class CacheProvider {

  public cacheInformacionClientes$: any;

  constructor(public http: HttpClient) {
    console.log('CacheProvider Provider');
    console.log('---------------------------------------------------');
  }

}
