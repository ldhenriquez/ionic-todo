# Feature Flags (Firebase Remote Config)

La app soporta *feature flags* para habilitar/deshabilitar funcionalidades sin publicar una nueva versión.

## Flags
- `ff_categories` (boolean)
  - `true`: se muestra la sección de categorías y el filtro por categoría.
  - `false`: se oculta/inhabilita la UI de categorías y se desactiva el filtro.

- `ff_bulk_actions` (boolean)
  - `true`: se muestran acciones masivas (Completar todas / Borrar completadas).
  - `false`: se ocultan.

## Valores por defecto
En `src/environments/environment*.ts`:
- `categoriesEnabled: true`
- `bulkActionsEnabled: true`

## Cordova + Remote Config
Se usa el plugin `cordova-plugin-firebase-config`.

1) Configura tus archivos de Firebase
- Android: `google-services.json` → `resources/android/`
- iOS: `GoogleService-Info.plist` → `resources/ios/`

2) Crea los parámetros en Firebase Console → Remote Config:
- `ff_categories`
- `ff_bulk_actions`

3) En la app, reinicia la aplicación (o fuerza refresh...)
