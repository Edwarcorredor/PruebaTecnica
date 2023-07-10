CREATE DATABASE prueba_tecnica_Edwar_M3;

USE prueba_tecnica_Edwar_M3;

CREATE TABLE historiales{
    id BIGINT(20) UNSIGNED PRIMARY KEY NOT NULL,
    cantidad INT(11),
    id_bodega_origen BIGINT(20) UNSIGNED,
    id_bodega_destino BIGINT(20) UNSIGNED,
    id_inventario BIGINT(20) UNSIGNED,
    created_by BIGINT(20) UNSIGNED,
    updated_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
};

CREATE TABLE inventarios{
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    id_bodega BIGINT(20) UNSIGNED,
    id_producto BIGINT(20) UNSIGNED,
    cantidad INT(11),
    created_by BIGINT(20) UNSIGNED,
    updated_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    deleted_at TIMESTAMP
};

CREATE TABLE bodegas{
    id BIGINT(20) UNSIGNED,
    nombre VARCHAR(255),
    
};







