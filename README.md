# Prueba Técnica Bodegas

Se crean 5 tablas para migración de datos:

![image-20230715133612034](C:\Users\eddac\AppData\Roaming\Typora\typora-user-images\image-20230715133612034.png)

La dirección para acceder al servidor es 127.0.0.5:3000

1. **Bodegas.** El endpoint para acceder a la información de bodegas es /historiales.

   - *Listar alfabéticamente.* Para listar las bodegas en orden alfabético tenemos que realizar una petición get

   - *Agregar bodegas.* Los datos de entrada para agregar bodegas son los siguientes:

     nombre, id_responsable, estado, created_by, update_by, updated_at, deleted_at. 

     Se deben enviar tal cual con el nombre mostrado

2. **Productos.** El endpoint para acceder a la información de los productos es /productos.

   - *Listar cantidad.* Para listar los productos por su cantidad total de manera descendente se realiza una petición get

   - *Insertar producto.* Los datos de entrada para agregar productos son los siguientes:

     nombre, descripcion, estado, created_by, update_by, updated_at, deleted_at.

     Se deben enviar tal cual con el nombre mostrado.

     Luego se agregará una cantidad del producto en la tabla inventarios con una cantidad de 10 en la bodega 11 por default

3. **Inventarios.** El endpoint para acceder a la información de los inventarios es /inventarios

   - *Insertar inventarios.* Los datos de entrada para agregar inventarios son los siguientes:

     id_bodega, id_producto, cantidad, created_by, update_by, updated_at, deleted_at.

     Se deben enviar tal cual con el nombre mostrado.

     Si no existe el inventario se creará un nuevo registro, pero si existe entonces se actualizará su información.

4. **Historiales.** El endopoint para acceder a la informacion de los historiales es /historiales

   - *Trasladar producto.* Los datos de entrada para agregar historiales son los siguientes:

     cantidad, id_bodega_origen, id_bodega_destino, id_producto, created_by, update_by, updated_at, deleted_at.

     Se deben enviar tal cual con el nombre mostrado.

     Se verifica que la bodega origen contenga el producto y luego que tenga la capacidad de trasladar la cantidad solicitada. 

     Luego de realizar el traslado de producto se genera un registro en el historial, en el cual se guardará la información de cantidad, bodega origen, bodega destino, y cuando se realizó este registro

