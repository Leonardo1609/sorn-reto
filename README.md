# RETO SORN

## Herramientas utilizadas
- React (Typescript)
- NodeJS (Express - Typescript - Sequelize)
- Tailwind CSS
- MySQL

**Para ejecutar la aplicación se tiene que seguir los siguientes pasos:**

## Sin Docker:
1. Tener la instancia de MySQL en el puerto 3306 y crear la base de datos sorndb
2. Configurar el archivo **.env** del backend con las credenciales de la instancia local de MySQL
3. Desde una terminal entrar a la carpeta backend y ejecutar `npm install`, realizar lo mismo con la carpeta frontend.
4. Iniciar el servidor desde una terminal dentro de la carpeta backend ejecutando `npm start`. Una vez inicializado el servidor, seguir el mismo paso con la carpeta frontend.
5 Ingresar desde el navegador a [http://localhost:3000](http://localhost:3000) 

## Con Docker:
1. Crear una red con nombre **sorn-net** en donde se ejecutarán los contenedores de docker: `docker network create sorn-net`
2. Desde la terminal de comandos, ejecutar un contenedor para la base de datos con la imágen pública de mysql: **`docker run --network sorn-net -p 3306:3306 -v data:/var/lib/mysql -e MYSQL_DATABASE=sorndb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_PASSWORD=root --rm --name mysqldb mysql`**. Si se obtiene un error, puede ser por tener una instancia de mysql corriento en el puerto 3306, asegurarse de detenerla y ejecutar el comando nuevamente. Esperar que se termine de ejecutar el comando y le indique que la instancia está disponible para recibir conexiones, antes de pasar al siguiente paso.
3. Navegar hasta la carpeta del proyecto y ejecutar: **`docker-compose up`**. Esperar a que los 2 contenedores (Backend y Frontend) terminen de ejecutarse y navegar a [http://localhost:3000](http://localhost:3000)
