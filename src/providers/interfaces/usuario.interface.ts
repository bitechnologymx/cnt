import { Role } from "./role.interface";

export class Usuario  {
  idUsuario: number;
  nombreUsuario: string;
  password: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  imagen: string;
  activo: boolean;
  estatusApp: number;
  ultimoIngreso: string;
  roles: Role[];
}
