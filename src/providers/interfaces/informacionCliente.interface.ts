import { DireccionCliente } from "./direccionCliente.interface";
import { Prospecto } from "./prospecto.interface";
import { ServicioFijo } from "./servicioFijo.interface";
import { ServicioMovil } from "./servicioMovil.interface";

export class InformacionCliente  {

  idCliente:number;
  cedulaRepresentanteLegal:string;
  email:string;
  noCedula:string;
  nombreApellidosRazonSocial:string;
  nombreReferenciaPersonal:string;
  nombreRepresentanteLegal:string;
  prospecto:boolean;
  direccionCliente:DireccionCliente;
  prospectoE:Prospecto;
  servicioFijo:ServicioFijo;
  servicioMovil:ServicioMovil;
  telefonoContacto:string;
  telefonoReferenciaPersonal:string;

}
