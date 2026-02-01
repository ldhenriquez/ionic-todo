# Build Android (Cordova)

> Requisitos: Java 17, Android SDK (API 35), Gradle (via Android Studio o sdkmanager).

## Debug (instalable)
```bash
bun install
bun run cordova:add:android
bun run cordova:android:debug
```
Salida esperada:
- `platforms/android/app/build/outputs/apk/debug/app-debug.apk`

## Release (firmado)
Cordova genera un release **unsigned**. Firma con `apksigner`:

1) Genera keystore (una vez):
```bash
keytool -genkeypair -v -keystore todo-release.keystore -alias todo -keyalg RSA -keysize 2048 -validity 10000
```
2) Build release:
```bash
bun run cordova:add:android
bun run cordova:android
```
3) Firma:
```bash
apksigner sign --ks todo-release.keystore --ks-key-alias todo platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```
4) Verifica:
```bash
apksigner verify --print-certs platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```

