import { Usuario } from "./usuario.interface";
import { DireccionProspecto } from "./direccionProspecto.interface";

export class Prospecto {

  idCliente: number;
  asignadoPor: Usuario;
  asignadoA: Usuario;
  direccionProspecto: DireccionProspecto;
  buroCredito: boolean;
  etapa: number;
  estatus: number;
  estatusComentario: string;
  probabilidad: number;
  fechaRegistro: string;
  sfInternetFijo: boolean;
  sfTelefoniaFija: boolean;
  sfTelevisionSuscripcion: boolean;
  solicitudServiciosFijos: boolean;
  solicitudServiciosMoviles: boolean;
  voto: boolean;
  fechaAsignacion: string;
  ultimaActualizacion: string;

}
