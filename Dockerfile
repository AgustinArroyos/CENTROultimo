# Usa una imagen ligera de Node solo para compilar
FROM node:14-alpine as build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias primero para aprovechar el caché de Docker
COPY package*.json ./

# Instala las dependencias de producción
RUN npm ci --only=production

# Copia el código fuente
COPY . .

# Compila la aplicación de React
RUN npm run build

# Usa una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos compilados desde la fase de construcción
COPY --from=build /app/build /usr/share/nginx/html

# Copia el archivo de configuración de Nginx (opcional)
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
