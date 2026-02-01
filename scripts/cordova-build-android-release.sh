#!/usr/bin/env bash
set -euo pipefail

# Always run from project root, even if called from elsewhere
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# Build web assets
bun run build:prod

# Ensure Cordova Android platform is present
if ! cordova platform ls | grep -qE '^android| android'; then
  echo "[cordova] Adding android platform..."
  cordova platform add android@14.0.1 --save
fi

# Release build
cordova build android --release
