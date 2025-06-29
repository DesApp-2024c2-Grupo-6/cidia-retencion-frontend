
# Sistema de sugerencias de cursada y acompañamiento académico - Frontend

Repositorio del frontend de la aplicación de sugerencias de cursada.

El objetivo principal de la aplicación es el de enviar mails con sugerencias de cursada a los alumnos de la Universidad Nacional de Hurlingham.

El proyecto se divide en distintos módulos según las distintas funcionalidades.

Los módulos desarrollados hasta el momento son:

Configuraciones: Edición de parámetros que la aplicación utiliza para generar las sugerencias de cursada, los cuales son:

- Configuración de planes de estudio, incluyendo las materias que conforman los mismos

- Configuración de plantillas de E-mail

- Configuración de datos generales

Asistencia: Permite visualizar los datos de asistencia a clase de todas las comisiones de las distintas materias que cursan los alumnos de la Universidad.

Análisis de Cohortes:  Permite visualizar el desempeño académico a lo largo del tiempo de un grupo de alumnos que comenzaron una carrera a la vez.





## Estructuctura de archivos del proyecto

Los archivos están dividos por módulos o features para facilitar la organización de archivos a medida que crezca la aplicación

```text
node_modules/
assets/
├── img
└── svg
src/
├── app/
│   ├── router
│   ├── app.jsx
│   └── app.css
├── components/
├── config/
├── features/
│   ├── configuracion/
│   │   ├── datos-generales/
│   │   │   ├── components
│   │   │   ├── page.jsx
│   │   │   └── services
│   │   ├── plantillas-email/
│   │   │   ├── components
│   │   │   ├── page.jsx
│   │   │   └── services
│   │   └── ...
│   ├── asistencia-cursada/
│   │   ├── components
│   │   ├── pages
│   │   └── services
├── store
├── styles
├── Main.jsx
└── index.css
```
## Instalación

Para instalar el proyecto de manera local debe seguir los siguientes pasos:

Navegar hacia la carpeta elegida para contener el proyecto.

Abrir la terminal de comandos/Git Bash.

Clonar el repositorio Backend con el siguiente comando sin las comillas:

```bash
  git clone "link del repositorio"
```

Ingresar a la carpeta con el comando: 

```bash
  cd cidia-retencion-backend
```
O ingresar con el sistema de carpetas y abrir una nueva terminal.

Instalar las dependencias ejecutando el siguiente comando:

```bash
  npm install
```
Luego ejecutar el comando
```bash
  git checkout dev
```
para tener el repositorio con las últimas actualizaciones.

Abrir el programa MongoDB Compass.

Seleccionar la opción “copy connection string”, esto copiará en nuestro portapapeles el link a nuestro cluster gratuito que fue creado al registrarnos y descargar MongoDB Compass. 

Crear en la raíz de la carpeta un archivo llamado .env y dentro de este archivo crear una variable llamada```MONGO_DB_URL``` 
y a continuación pegar el string de conexión junto a la variable dentro de comillas. 
Ejemplo: 
```bash
  MONGO_DB_URL="link de conexión"
``` 


Para iniciar la aplicación ejecutar el siguiente comando en el repositorio del proyecto.

```bash
  npm start
```
Por defecto la URL del Backend es http://localhost:3001.

## Stack tecnológico
Lenguaje de programación utilizado: Javascript

React 18.2.0:  Es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario.

React Router 6.22.3: Biblioteca estándar para el enrutamiento en aplicaciones hechas con React.

Material UI 5.15.18:  Biblioteca de componentes.

Vite 5.2.0: Es un empaquetador y servidor de desarrollo moderno para aplicaciones web.

Recharts 2.15.1 : Biblioteca de gráficos analíticos para React.

