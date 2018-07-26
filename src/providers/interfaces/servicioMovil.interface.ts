import { FormaPago } from "./formaPago.interface";
import { ServicioMovilContratado } from "./servicioMovilContratado.interface";

export class ServicioMovil {

  idCliente: number;
  formaPago: FormaPago;
  servicioMovilContratado: ServicioMovilContratado[];
  autorizacionDebito: boolean;
  autorizacionEnvioFacturasElectronicas: boolean;
  autorizacionEnvioInformacionComercial: boolean;
  fechaRegistro: string;
  firmaCliente: string;
  firmaClienteNoCedula: string;
  firmaClienteNombreApellido: string;
  firmaClientePoliticaBuenUso: string;
  firmaVendedor: string;
  firmaVendedorCodVendedor: string;
  firmaVendedorNombreApellido: string;
  lugarRegistro: string;
  noContrato: string;
  totalValorMensual: number;

}
