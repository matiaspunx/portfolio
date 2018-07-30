<p align="center">
<img width="339px" src="https://matias-punx.firebaseapp.com/img/iso.png">
</p>
<p align="center">
<a href="https://matias-punx.firebaseapp.com/" align="center">:zap: Demo online</a>&nbsp;&nbsp;|&nbsp;&nbsp;
<a href="#empezá-a-usarlo">:rocket: Empezá a usarlo</a>
</p>

## Empezá a usarlo
1. [Fork el repositorio](https://github.com/matiaspunx/portfolio/fork) y clonalo localmente.
1. Setup
   * Instalar [Node.js (v8.9.4 o superior)](https://nodejs.org/en/download/)
   * Instalar Firebase CLI: `npm i -g firebase-tools`
1. Crear una cuenta en [Firebase](https://console.firebase.google.com)
1. Creá un nuevo proyecto en [Firebase](https://console.firebase.google.com) y conectá el [Firebase CLI](https://firebase.google.com/docs/cli/): `firebase login`
1. Actualizá tu proyecto desde la terminal y conectá tu base de datos: `firebase use --add`
1. Importá la info inicial a la base de datos de Firebase
    * Abrí y editá la [info inicial](/public/data/primer-carga-datos.json)
      - Andá a https://console.firebase.google.com/project/%YOUR_PROJECT_ID%/database/
      - Importá el archivo .json
1. Habilitá el login con Google en los [proveedores de autenticación](https://console.firebase.google.com/u/0/project/%YOUR_PROJECT_ID%/authentication/providers)
1. Corré el proyecto en un servidor local
   * `firebase serve`
1. Deploy a Firebase
   * `firebae deploy`

*NOTE:* ¡Cualquier problema que surja en la configuración o instalación no duden en consultarme!

## TODO

* ABM de porfolio y mensajes.
* ¿Sugerencias?

## Version

* Versión 0.1 BETA.

## Licencia

Este repo es de código abierto y pueden hacer fork, clonarlo y usarlo para crear su propio porftolio y obviamente, si pueden, darme crédito. Cualquier mejora me pueden enviar sus push request y las veo. Si quieren comentar tambien pueden hacerlo.

## Contacto

Si necesitas contactarme podes hacerlo a matias.punx[at]gmail.com.