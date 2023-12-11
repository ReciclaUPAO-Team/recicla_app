export interface Comunidad {
  id: number;
  nombre: string;
  descripcion: string;
  creadorId?: number;
  esCreador?: boolean;
  yaUnido?: boolean; // Agrega esta propiedad
}