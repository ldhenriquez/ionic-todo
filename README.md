# Ionic To‑Do (Cordova) — Clean Architecture + Feature Flags (Remote Config)

Proyecto de prueba técnica: To‑Do List con categorías, persistencia local, filtros y **feature flags con Firebase Remote Config**.
Incluye optimizaciones de rendimiento como **ChangeDetectionStrategy.OnPush**, **trackBy** en listas, **lazy loading** por rutas y **persistencia debounced** en storage.

---

## ✅ Requisitos del entorno

- **Linux (para Android)**: Node 20 (recomendado), Java/JDK, Android SDK + Build Tools.
- **iOS**: requiere **macOS + Xcode** para exportar IPA (en Linux no se genera IPA).

> Si tu máquina tiene un registry corporativo (CodeArtifact) y te da 401, este repo ya trae un `.npmrc` para forzar npmjs.

---

## 🚀 Instalación con Bun

```bash
bun install
bun run serve
```

---

## 📱 Cordova (Android)

> Nota: En algunos setups con Angular 17+, `ionic cordova build ...` puede fallar con `Unknown argument: platform`.
> Por eso este repo trae scripts que **usan Cordova directo**, sin depender del wrapper del Ionic CLI.

> Los scripts agregan la plataforma automáticamente si no existe.

Build debug:
```bash
bun run cordova:android:debug
```

Build release:
```bash
bun run cordova:android
```

APK (release) suele quedar en:
`platforms/android/app/build/outputs/apk/release/`

### Android SDK 35 (importante)
Este proyecto alinea:
- targetSdkVersion=35
- compileSdkVersion=35

En tu máquina debes tener:
- `platforms;android-35`
- `build-tools;35.0.0`

---

## 🍏 Cordova (iOS)

En Linux podrás **agregar** la plataforma:
```bash
bunx cordova platform add ios
```

Pero **no podrás compilar/exportar IPA en Linux**. Para IPA usa macOS + Xcode.

---

## 🔥 Firebase Remote Config (Feature Flags)

Este proyecto usa el plugin Cordova `cordova-plugin-firebase-config`.
Parámetros a crear en Remote Config (boolean):
- `ff_categories` (muestra/oculta UI de categorías)
- `ff_bulk_actions` (muestra/oculta acciones masivas)

### Configuración de Firebase
1. Crea un proyecto Firebase.
2. Descarga:
   - `google-services.json`
   - `GoogleService-Info.plist`
3. Pon ambos archivos en la **raíz del proyecto** (NO los subas al repo si es público).
   - Este repo incluye **placeholders** para que el build no falle. Reemplázalos por los reales.
4. Agrega el plugin:
```bash
bunx cordova plugin add cordova-plugin-firebase-config
```

> El `config.xml` ya incluye `resource-file` para copiar esos archivos.

---

## 🧱 Arquitectura (Clean-ish aplicada a Angular)

- `domain/`: modelos + contratos + use cases (fáciles de testear)
- `data/`: repositorios locales (Ionic Storage) + datasource
- `presentation/`: páginas, componentes, facades (estado UI)
- `core/`: init, feature flags, guards, utils

---

## ⚡ Optimizaciones incluidas

- **Lazy loading** de módulos por rutas (carga inicial más liviana)
- `ChangeDetectionStrategy.OnPush` + `async` pipe para minimizar ciclos de change detection
- `trackBy` en listas para evitar re-render innecesario
- Persistencia local con **debounce** (250ms) para reducir escrituras a Storage
- Estado derivado con RxJS (`combineLatest` + `map`) sin duplicar listas
- **Angular CDK** está instalado por si se quiere agregar `cdk-virtual-scroll-viewport` en una iteración futura

---

## 📸 Evidencia (requisito del PDF)

Para la entrega, crea una carpeta `evidence/` con:
- Capturas de pantalla (CRUD de tareas, CRUD de categorías, filtros, búsqueda)
- Un video corto mostrando el flujo completo
- Artefactos de build: APK/AAB (Android) y (si aplica) IPA (iOS)

---

## Respuestas técnicas

Las respuestas solicitadas por el enunciado están en **`docs/answers.md`**.

## Documentación
- Build Android: `docs/BUILD_ANDROID.md`
- Build iOS: `docs/BUILD_IOS.md`
- Feature Flags (Remote Config): `docs/FEATURE_FLAGS.md`
