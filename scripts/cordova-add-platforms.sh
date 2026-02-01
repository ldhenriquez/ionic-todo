#!/usr/bin/env bash
set -euo pipefail
PLATFORM="${1:-}"
if [[ -z "$PLATFORM" ]]; then
  echo "Usage: cordova-add-platforms.sh <android|ios>" >&2
  exit 2
fi

# Ensure we are at repo root
cd "$(dirname "$0")/.."

if [[ ! -f config.xml ]]; then
  echo "config.xml not found. Run from project root." >&2
  exit 2
fi

# Add platform if missing
if [[ ! -d "platforms/$PLATFORM" ]]; then
  echo "[cordova] Adding platform: $PLATFORM"
  cordova platform add "$PLATFORM" --save
else
  echo "[cordova] Platform already exists: $PLATFORM"
fi
