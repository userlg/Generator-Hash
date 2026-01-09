# Generator-Hash 🔐

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/pinia-%23ffd859.svg?style=for-the-badge&logo=pinia&logoColor=black)

Un generador de hashes de contraseñas moderno, seguro y atractivo construido con **Vue 3** y **TypeScript**.
Esta aplicación permite a los usuarios generar hashes seguros BCrypt a partir de contraseñas, gestionarlos localmente y exportarlos a PDF.

[**🚀 Ver Demo**](https://userlg.github.io/Generator-Hash/)

## ✨ Características

- **🛡️ Hashing Seguro**: Utiliza `bcrypt-ts` para generar hashes de contraseña seguros.
- **🎨 UI Premium**: Una interfaz moderna y sensible construida con Tailwind CSS, con un diseño oscuro estilo glassmorphism.
- **💾 Persistencia Local**: Tus datos se guardan localmente en tu navegador usando Pinia Persisted State.
- **📄 Exportación a PDF**: Exporta tu lista de hashes generados a un reporte PDF con un solo clic.
- **📋 Copiado Rápido**: Copia fácilmente los hashes al portapapeles.
- **📱 Diseño Responsivo**: Totalmente optimizado para dispositivos de escritorio y móviles.

## 🛠️ Tecnologías

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **Herramienta de Compilación**: [Vite](https://vitejs.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Gestión de Estado**: [Pinia](https://pinia.vuejs.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) & [Vue Test Utils](https://test-utils.vuejs.org/)
- **Utilidades**: `pdf-lib` (Generación de PDF), `downloadjs`, `vue-clipboard3`

## 🚀 Comenzando

### Prerrequisitos

- Node.js (Se recomienda la última versión LTS)
- `yarn` (recomendado) o `npm`

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/userlg/Generator-Hash.git
   cd Generator-Hash
   ```

2. **Instalar dependencias**

   ```bash
   yarn install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   yarn dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🏗️ Compilación y Pruebas

### Build de Producción

Para crear una versión lista para producción:

```bash
yarn build
```

La salida estará en el directorio `dist`.

### Ejecutar Pruebas

Ejecuta la suite de pruebas unitarias con Vitest:

```bash
yarn test
```

Verificar cobertura de código:

```bash
yarn coverage
```

## 📂 Estructura del Proyecto

```
src/
├── assets/          # Assets estáticos (imágenes, css global)
├── components/      # Componentes Vue
│   ├── layout/      # Header, Footer
│   ├── ui/          # Componentes base (Button, Input, Modal)
│   └── ...          # Componentes funcionales
├── composables/     # Lógica compartida (usePDFGenerator)
├── interfaces/      # Interfaces TypeScript / IDL
├── security/        # Lógica de hashing
├── stores/          # Stores de Pinia
├── App.vue          # Componente raíz
└── main.ts          # Punto de entrada
```

## 🤝 Contribuyendo

¡Las contribuciones son bienvenidas! Siéntete libre de enviar un Pull Request.

1. Haz un Fork del proyecto
2. Crea tu rama de funcionalidad (`git checkout -b feature/AmazingFeature`)
3. Haz Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).

---

Creado por [Userlg](https://github.com/userlg)
