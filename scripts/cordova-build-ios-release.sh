#!/usr/bin/env bash
set -euo pipefail

UNAME=$(uname -s)
if [ "$UNAME" != "Darwin" ]; then
  echo "[cordova] iOS build requires macOS (Xcode)."
  echo "         You can still add the platform and open the project from macOS."
fi

bun run build:prod

if [ ! -d "platforms/ios" ]; then
  echo "[cordova] Adding ios platform..."
  bunx cordova platform add ios@8.0.0 --save
fi

echo "[cordova] Building ios release..."
bunx cordova build ios --release
