CREATE DATABASE prueba_tecnica_Edwar_M3;

USE prueba_tecnica_Edwar_M3;

CREATE TABLE historiales (
    id BIGINT(20) PRIMARY KEY NOT NULL,
    cantidad INT(11),
    id_bodega_origen BIGINT(20) UNSIGNED,
    id_bodega_destino BIGINT(20) UNSIGNED,
    id_inventario BIGINT(20) UNSIGNED,
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL
);


CREATE TABLE inventarios(
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    id_bodega BIGINT(20) UNSIGNED,
    id_producto BIGINT(20) UNSIGNED,
    cantidad INT(11),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE bodegas(
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    nombre VARCHAR(255),
    id_responsable BIGINT(20) UNSIGNED,
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL
);

CREATE TABLE productos(
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    created_at TIMESTAMP,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL

);


CREATE TABLE users(
    id BIGINT(20) UNSIGNED NOT NULL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    email_verified_at TIMESTAMP NULL,
    estado TINYINT(4),
    created_by BIGINT(20) UNSIGNED,
    update_by BIGINT(20) UNSIGNED,
    foto VARCHAR(255),
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL
);

ALTER TABLE historiales ADD CONSTRAINT FK_id_bod_ori_id FOREIGN KEY (id_bodega_origen) REFERENCES bodegas (id);

ALTER TABLE historiales ADD CONSTRAINT FK_id_bod_dest_id FOREIGN KEY (id_bodega_destino) REFERENCES bodegas (id);

ALTER TABLE historiales ADD CONSTRAINT FK_id_invent_id FOREIGN KEY (id_inventario) REFERENCES inventarios (id);

ALTER TABLE historiales ADD CONSTRAINT FK_crea_by_id FOREIGN KEY (created_by) REFERENCES users (id);

ALTER TABLE historiales ADD CONSTRAINT FK_upda_by_id FOREIGN KEY (update_by) REFERENCES users (id);

ALTER TABLE inventarios ADD CONSTRAINT FK_id_bode_id FOREIGN KEY (id_bodega) REFERENCES bodegas (id);

ALTER TABLE inventarios ADD CONSTRAINT FK_id_prod_id FOREIGN KEY (id_producto) REFERENCES productos (id);

ALTER TABLE inventarios ADD CONSTRAINT FK_crea_by_inven_id_users FOREIGN KEY (created_by) REFERENCES users (id);

ALTER TABLE inventarios ADD CONSTRAINT FK_upda_by_inven_id_users FOREIGN KEY (update_by) REFERENCES users (id);

ALTER TABLE productos ADD CONSTRAINT FK_crea_by_produ_id_users FOREIGN KEY (created_by) REFERENCES users (id);

ALTER TABLE productos ADD CONSTRAINT FK_upda_by_produ_id_users FOREIGN KEY (update_by) REFERENCES users (id);

ALTER TABLE bodegas ADD CONSTRAINT FK_id_respo_bode_id_users FOREIGN KEY (id_responsable) REFERENCES users (id);

ALTER TABLE bodegas ADD CONSTRAINT FK_crea_by_bode_id_users FOREIGN KEY (created_by) REFERENCES users (id);

ALTER TABLE bodegas ADD CONSTRAINT FK_upda_by_bode_id_users FOREIGN KEY (update_by) REFERENCES users (id);



