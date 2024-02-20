# Sistema Argos

En este repositorio se encuentra el código del Front-End del sistema A.R.G.O.S.
Se encuentra desarrollado usando React v18.2.0 utilizando como servidor de desarrollo a Vite, mismo que sirve para compilar el código y generar los archivos de producción.

##  Levantar un servidor de desarrollo

Con el repositorio clonado en cualquier ubicación, sigue las instalaciones en este orden:

1. Instalar Node.js
2. Instalar Yarn de manera global: 
    ```shell
    npm install -g yarn
    ```
3. Abrir una terminal en la carpeta del proyecto
    ```shell
    yarn    
    ```
4. Verificar que el servicio del Back-End se encuentre corriendo
5. Ejecutar el siguiente comando para levantar un servidor de desarrollo
    ```shell
    yarn dev --host
    ```
Nota importante: Por ningun motivo borrar o alterar los archivos:
**package-lock.json**,  **package.json**,  **vite.config.js**,
  **yarn.lock**, ya que son archivos importantes con configuraciones y registros de que versiones y que bibliotecas y paquetes usa el sistema.

## Generar una build de produccón

Ante cualquier cambio que se realice en el código se tiene que contruir la build de producción, el resltado seran los archivos que se han de colocar en la carpeta htdocs o www, o public dependiendo de que servidor web se este inplementando, como XAMPP, WAMP, o el mismo servidor http de node.

Para contruir la build de produccion ejecutar dentro de la carpeta del proyecto: 
```shell
yarn build
```
La build de produccion se encontrara en la carpeta **/dist**

## Variables de entorno

El codigo necesita de un archivo especial, el cual aloja las variables de entorno, llamese variables globales que se requieren a lo largo de la aplicación, para el caso del sofwtare las variables aqui guardadas son las rutas hacia el Back-End, categorizadas para funciones especificas, de manera que el archivo **.env** debe contar con las siguientes variables: 
```
VITE_BACKEND_SERVER_AUTH=
VITE_BACKEND_SERVER_BASES=
VITE_BACKEND_SERVER_BUSCADOR_GENERAL=
VITE_BACKEND_SERVER_GRAFICAS=
VITE_BACKEND_SERVER_MAPAS=
VITE_BACKEND_SERVER_BASE_PERSONAS=
VITE_BACKEND_SERVER_HISTORIAL=
VITE_BACKEND_SERVER_CATALOGOS=
VITE_BACKEND_SERVER_USUARIOS=
VITE_BACKEND_SERVER_GENERADOR=
```
Como se trabaja con vite todas las variables de entorno personalizadas deben de comenzar con  la palabra **VITE** de lo contrario no podran ser detectadas y accesibles.

## Código

Todo el código fue realizado por [@RaulRomero26](https://github.com/RaulRomero26), se que hay mejores formas de programarlo y si las encuentran los invito a que mejoren el código, todo se encuentra comentado lo mejor que pude, sin embargo recomiendo al 100% tener conocimiento de ReactJS, Vite y NodeJS.

*Cuando escribí esto, sólo Dios y yo entendíamos lo que estaba haciendo.*
*Ahora ya solo lo sabe Dios.*
