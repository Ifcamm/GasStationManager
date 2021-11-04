# GasStationManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


# Objetivos y Alcance, Misión del Proyecto

## Objetivos
Desarrollar una aplicación web que permita el registro de las transacciones realizadas en
una estación de servicio de forma personalizada, facilitando la recolección y generación de información de ventas.

## Misión, Alcance
Por medio de este proyecto se busca diseñar un aplicativo que permita mejorar el proceso de registro de las transacciones de ventas de combustible realizadas en las estaciones de servicio, ayudando así a los administradores de la estación a generar reportes de las ventas realizadas, obteniendo información clave como cual es el combustible más vendido o los días y horas de mayor consumo, de tal forma que con esta información puedan planear una mejor atención al cliente, adicional podrán llevar un registro exacto de las utilidades del negocio

El proyecto tendrá como alcance generar una interfaz Web que permita el registro de clientes de la estación de servicio, que registrecuanto combustible es comprado por los clientes y al final muestre un reporte de las ventas realizadas en un lapso de tiempo establecido.

# Roles Centrales del Proyecto

|ROL  | RESPONSABLE
|--|--|
| PRODUCT OWNER | FERNANDO ROA |
|SCRUM  MASTER| FELIPE CAMARGO 
| SCRUM TEAM| JESUS MURILLO, LUIS VALVUENA, LUZ VIVIANA MORENO

# Identificación de usuarios participantes

Administrador del sistema: Administrador de la Estación de Servicio
Vendedor: Persona encargada de la venta de combustible

## Requisitos Funcionales

1.	Módulo de log in de usuario

    Introducción: El aplicativo deben tener los siguientes campos:  Nombre de usuario y contraseña.

    Entradas: Nombre de usuario y contraseña.

    Proceso: Acceso a la plataforma por parte de los usuarios habilitados.

    Salida: Ingreso por parte del usuario al aplicativo

2.	Registro de clientes

    Introducción: Se utiliza para crear el registro de clientes

    Entrada: Nombre, cédula, tipo de vehículo, correo electrónico, placa

    Proceso:  Crear una base de datos de los clientes de la estación de servicio

    Salida:  Interfaz con los datos del usuario.

3.	Actualización de clientes

    Introducción: Se utiliza para actualizar los datos de un cliente. 

    Entrada:  Datos del cliente a actualizar: cédula, correo electrónico

    Proceso:  Actualizar en la base de datos los clientes con los datos recolectados por el vendedor.

    Salida:  Interfaz con los datos del usuario actualizados.

4.	Eliminar Cliente

    Introducción: Se utiliza para eliminar el registro de un cliente. 

    Entrada:  Datos del cliente a eliminar: cédula

    Proceso:  Eliminar los datos relacionados con el usuario.

    Salida:  Artículos de inventario actualizados

5.	Consulta de Clientes en la Base de Datos.

    Introducción: Esta opción debe mostrar los clientes registrados en su sistema.

    Entradas: cédula – opcional.

    Proceso: El sistema procede a realizar la búsqueda en la base de Datos todos los clientes registrados en el sistema

    Salida: Tabla con los clientes registrados.

6.	Registro de venta

    Introducción: Se utiliza para generar el registro de las ventas de combustible. 

    Entrada: fecha, cedula cliente, tipo de combustible, cantidad, valor unitario, valor total, medio de pago

    Proceso: Crear una base de datos con el registro de las ventas de combustible

    Salida:  Interfaz con los datos de la venta.

7.	Consulta de las ventas realizadas

    Introducción: Esta opción debe mostrar consultas ágiles de las ventas realizadas en un tiempo especifico

    Entradas: tipo de combustible, fecha-hora inicial, fecha-hora final.

    Proceso: El sistema procede a realizar la búsqueda en la base de Datos del tipo de combustible y devuelve la relación de ventas

    Salida: Tabla con ventas.

8.	Reportes

    Introducción: Reporte para visualizar los datos que requiera el administrador. 

    Entrada:  Criterios de consulta usados por el administrador.

    Proceso:  Generar consulta a la base de datos de acuerdo criterios ingresados.

    Salida:  Reporte de la información solicitada de acuerdo a criterios seleccionados.


## Requisitos No Funcionales

1.	Cambios para permitir el acceso al aplicativo.

    Introducción: Los permisos de acceso al sistema podrán ser cambiados solamente 	por el encargado de administrar el acceso a datos.

    Entradas: Cambios de usuario y claves.

    Proceso:  El administrador de acceso a datos es el responsable de realizarlos.

    Salida: Usuario y contraseña actualizados.


2.	Tiempo de aprendizaje manejo del aplicativo.

    Introducción: Los usuarios del aplicativo deben ser capacitados para adquirir la 		destreza del manejo de este.

    Entradas: Capacitación suministrada por el equipo de desarrollo del aplicativo.

    Proceso:  El tiempo de aprendizaje para el manejo del aplicativo por un usuario 		deberá ser menor a 2 horas.

    Salida: Usuario capacitado y con las competencias para el manejo del aplicativo.


3.	Escalabilidad.

    Introducción: Capacidad para manejar una carga creciente de datos 

    Entrada:  Diseño arquitectura de software e infraestructura

    Proceso:  El diseño del aplicativo debe contemplar el uso óptimo de recursos: conexión a la base de datos. Contemplar en el diseño la separación entre datos, recursos y aplicaciones para optimizar la escalabilidad del sistema, requerimientos de crecimientos para usuarios tantos internos como externos.

    Salida: Aplicativo escalable, diagramas lógicos, de red e infraestructura.

4.	Disponibilidad.

     Introducción: capacidad de un servicio, de unos datos o de un sistema, a ser accesible y utilizable por los usuarios (o procesos) autorizados cuando estos lo    requieran.

    Entrada: Definición gerencial de operación de la empresa.

    Proceso: La disponibilidad del sistema debe ser continua con un nivel de servicio para los usuarios de 7 días, 24 horas, garantizando un esquema adecuado que permita ante una posible falla de la solución de cualquiera de sus componentes.

    Salida: Software disponible para el usuario.

5.	Confiabilidad.

    Introducción: Precisión con la que una aplicación proporciona, sin errores, los servicios que se establecieron en las especificaciones originales.

    Entrada: Requisitos de desarrollo

    Proceso: Debe contemplar requerimientos de confiabilidad y consistencia de los componentes de negocio ante recuperaciones. En caso de fallas de algún componente, no debe haber pérdida de información.

    Salida:  Sistemas de backup, recuperación y log de transacciones.





