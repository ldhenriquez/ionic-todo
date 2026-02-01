# Build iOS (Cordova)

> iOS **solo** se puede compilar en macOS por dependencia de Xcode.

## Pasos (macOS)
1) Instala dependencias:
```bash
brew install node@20 bun
npm i -g cordova @ionic/cli
```
2) Entra al proyecto y ejecuta:
```bash
bun install
bun run cordova:add:ios
bun run cordova:ios
```
3) Abre el proyecto en Xcode:
- `platforms/ios/IonicTodoClean.xcworkspace`

## Exportar IPA
- Selecciona un *Signing Team* y *Bundle Identifier*.
- `Product > Archive` → `Distribute App` → `Ad Hoc`/`Development`.

> Nota: Para CI/CD con GitHub Actions (macOS runner) se requiere configurar certificados y perfiles.
