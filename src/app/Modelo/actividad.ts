export interface Actividad {
    nombre: string;
    cantidad: number;
    residuo: number; // Suponiendo que residuo es un ID
    imagen: string; // Imagen en formato base64
    usuarioId: number;
}