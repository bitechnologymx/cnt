import { Menu } from "./menu.interface";

export class Role{
  idRole: number;
  nombre: string;
  descripcion: string;
  menus: Menu[];
}
