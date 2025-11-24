# Requisitos API — Sistema de Usuarios y Países

## Descripción general

El objetivo de esta API es gestionar usuarios y conectarse con la API pública **[restcountries.com](https://restcountries.com/)** para obtener información de países.  
El proyecto debe implementar autenticación JWT, documentación con Swagger, pruebas con Jest y conexión a una base de datos PostgreSQL mediante **TypeORM**.

---

## 🧩 Requisitos técnicos

### Integraciones y librerías

- **API externa:** [https://restcountries.com/](https://restcountries.com/)
- **Documentación:** Swagger
- **ORM:** TypeORM (compatible PostgreSQL)
- **Testing:** Jest
- **Autenticación:** JWT (JSON Web Token)
- **Decoradores y Guards:** Implementación de seguridad y metadatos
- **Logger personalizado:** debe mostrar por terminal la clase que lo invoca

---

## ⚙️ Funcionalidades clave

1. **Integración de la API RestCountries**
   - Conectarse a la API para obtener la lista completa de países.
   - Obtener información individual de un país por su identificador o código.

2. **Swagger**
   - Configuración e integración de Swagger UI para documentar los endpoints de la API.

3. **Base de datos**
   - Conexión a **PostgreSQL** mediante **TypeORM**.
   - Sincronización automática de entidades (en entorno de desarrollo).
   - Uso de repositorios y DTOs para la manipulación de datos.

4. **Testing**
   - Implementación de pruebas unitarias para los servicios con Jest.
   - Cobertura mínima recomendada: **70%**.

5. **Logger personalizado**
   - Debe imprimir en consola el nombre de la clase que lo invoca.
   - Permitir niveles: info, warning, error.

6. **Decorador personalizado**
   - Debe permitir obtener información del usuario autenticado (username y email) desde el contexto de ejecución.

7. **Autenticación JWT**
   - Generación y validación de tokens.
   - Uso de **guards** para proteger rutas privadas.

---

## 🔐 Endpoints

### Usuarios

| Método     | Endpoint    | Descripción                                          |
| ---------- | ----------- | ---------------------------------------------------- |
| **GET**    | `/users`    | Devuelve un array con todos los usuarios.            |
| **GET**    | `/user/:id` | Devuelve un objeto con la información de un usuario. |
| **PATCH**  | `/user/:id` | Actualiza la información de un usuario.              |
| **DELETE** | `/user/:id` | Elimina un usuario.                                  |

### Países

| Método  | Endpoint       | Descripción                                                           |
| ------- | -------------- | --------------------------------------------------------------------- |
| **GET** | `/countries`   | Obtiene de la API un listado de todos los países y devuelve un array. |
| **GET** | `/country/:id` | Obtiene el dato de la API y lo devuelve.                              |

---

## 🧠 Resumen técnico

- Framework sugerido: **NestJS / Express**
- ORM: **TypeORM**
- BD: **PostgreSQL**
- Tests: **Jest**
- Logger: Custom con contexto de clase
- Auth: **JWT + Guards + Decorator personalizado**
- Documentación: **Swagger UI**
- API externa: **RestCountries**
