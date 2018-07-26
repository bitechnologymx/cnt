import { FormaPago } from "./formaPago.interface";

export class TelevisionSuscripcion {

  noContrato: string;
  noContratoTelevision: string;
  cntDuoPack: boolean;
  cntTriplePack: boolean;
  decodificadorAdicionalInstalacion: number;
  decodificadorPrincipalInstalacion: number;
  decodificadoresAdicionalesPromo: number;
  decodificadoresAdicionalesTarifa: number;
  garantiaExtendidaInstalacion: number;
  noFacturar: string;
  noPeticion: number;
  pensionBasicaMensual: number;
  planContratado: number;
  promoDetalleInstalacion: string;
  promoInstalacion: number;
  tipoTecnologia: string;
  decodificadorAdicionalSd: boolean;
  decodificadorAdicionalHd: boolean;
  decodificadorAdicionalZapper: boolean;
  decodificadorAdicionalOtros: boolean;
  noDecodificadorAdicionalSd: string;
  noDecodificadorAdicionalHd: string;
  noDecodificadorAdicionalZapper: string;
  noDecodificadorAdicionalOtros: string;
  planAdicionalDesc1: string;
  planAdicionalDesc2: string;
  planAdicionalDesc3: string;
  planAdicionalDesc4: string;
  planAdicionalDesc5: string;
  planAdicionalTarifa1: number;
  planAdicionalTarifa2: number;
  planAdicionalTarifa3: number;
  planAdicionalTarifa4: number;
  planAdicionalTarifa5: number;
  formaPago: FormaPago;

}
