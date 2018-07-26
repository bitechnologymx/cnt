import { FormaPago } from "./formaPago.interface";
import { InternetFijo } from "./internetFijo.interface";
import { TelefoniaFija } from "./telefoniaFija.interface";
import { TelevisionSuscripcion } from "./televisionSuscripcion.interface";

export class ServicioFijo {

  idCliente: number;
  internetFijo: InternetFijo;
  telefoniaFija: TelefoniaFija;
  televisionSuscripcion: TelevisionSuscripcion;
  autorizacionDebito: boolean;
  autorizacionEnvioFacturasElectronicas: boolean;
  autorizacionEnvioInformacionComercial: boolean;
  fechaRegistro: string;
  firmaCliente: string;
  firmaClienteNoCedula: string;
  firmaClienteNombreApellido: string;
  firmaVendedor: string;
  firmaVendedorCodVendedor: string;
  firmaVendedorNombreApellido: string;
  lugarRegistro: string;
  noContrato: string;
  politicaBuenUsoInternetFijo: boolean;
  politicaBuenUsoTelefoniaFija: boolean;
  politicaBuenUsoTelevisionSuscripcion: boolean;

}
