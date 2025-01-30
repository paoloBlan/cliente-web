export class Cliente {
    id?: number;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    ciudad: string;
    pais: string;


    constructor(nombre: string = '', apellido: string = '', telefono: string = '', email: string = '', ciudad: string = '', pais: string = '') {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.email = email;
        this.ciudad = ciudad;
        this.pais = pais;
    }
}
