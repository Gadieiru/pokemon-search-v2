# My Pokedex: React + TypeScript

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)

¡Hola! Este es el Frontend de mi sistema de gestión Pokémon. Lo que empezó como un proyecto de práctica ha evolucionado en una aplicación estructurada, enfocada en el manejo de flujos de datos reales y la mejora constante de la arquitectura.

## ¿Qué cambió en esta versión?

Decidí dejar atrás las bases de JavaScript puro para enfrentarme a herramientas más exigentes. No se trata solo de la estética, sino de construir código confiable:

* **TypeScript (TSX):** Mi mayor reto y satisfacción. Implementar tipos para los Pokémon y las respuestas del servidor me ayudó a entender mejor cómo viaja la información y a evitar errores en tiempo de ejecución.
* **Axios:** Migré de `fetch` nativo a Axios para organizar mejor las peticiones, configurar una instancia base y gestionar los errores de forma clara.
* **React 19 + Vite:** La base ideal para una carga instantánea y un desarrollo fluido.
* **Rediseño Visual:** Refactoricé el CSS para darle una identidad de Pokédex real, cuidando detalles en sombras, estados de botones y diseño responsivo.

## Aprendizajes Clave

Este proyecto refleja un proceso de crecimiento técnico:
* **Seguridad de Tipos:** El paso a TS me dio la confianza de saber exactamente qué contiene cada variable en todo momento.
* **Conectividad:** Lograr una integración perfecta con mi backend en Python, especialmente al manejar archivos multimedia con `FormData`.
* **Código Limpio:** Me esforcé por crear componentes pequeños y legibles, aplicando buenas prácticas para que el proyecto sea fácil de entender.

## Funcionalidades

1.  **Sistema de Auth:** Registro e inicio de sesión con manejo de tokens (JWT).
2.  **Privacidad de Datos:** Cada usuario gestiona su propia colección de Pokémon de forma independiente.
3.  **Gestión Completa (CRUD):** Subida de imágenes con previsualización, edición de datos y borrado seguro.

## Instalación Local

1. **Clonar el repositorio:**
```bash
git clone https://github.com/Gadieiru/pokemon-search-frontend.git
Entrar a la carpeta:

Bash
cd pokemon-search-frontend
Instalar dependencias:

Bash
npm install
Configuración:
Crea un archivo .env en la raíz y apunta a la URL de tu API:

Fragmento de código
VITE_API_URL=http://localhost:5000
Ejecutar el proyecto:

Bash
npm run dev
Enlaces Relacionados
Backend Repository (Python/Flask): https://github.com/Gadieiru/pokemon-api-python

Hecho con dedicación, café y ganas de seguir mejorando por Gadieiru


---

¡Listo! Ya tienes los links limpios, la estructura clara y todo el peso de tu esfuerzo en Python y TS bien documentado. ¡A por ese `git push`! 🚀🔥
