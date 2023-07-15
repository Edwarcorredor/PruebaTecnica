import { Type, Transform, Expose } from "class-transformer";

export class productos{
        /**
    **variables de entrada:
    **nombre, descripcion, estado, created_by, update_by, updated_at, deleted_at
    */
    @Expose({name: "nombre"})
    NOMBRE:string
    @Expose({name: "descripcion"})
    DESCRIPCION:string
    @Expose({name: "estado"})
    ESTADO:number
    @Expose({name: "created_by"})
    CREATED_BY:number
    @Expose({name: "update_by"})
    UPDATE_BY:number
    @Expose({name: "created_at"})
    CREATED_AT:string
    @Expose({name: "updated_at"})
    UPDATE_AT:string
    @Expose({name: "deleted_at"})
    DELETED_AT:string
    constructor(p1:string, p2:string, p3:number, p4:number, p5:number, p6:string, p7:string, p8:string){
        this.NOMBRE = p1;
        this.DESCRIPCION = p2;
        this.ESTADO = p3;
        this.CREATED_BY = p4;
        this.UPDATE_BY = p5;
        this.CREATED_AT = p6;
        this.UPDATE_AT = p7;
        this.DELETED_AT = p8;
    }
}