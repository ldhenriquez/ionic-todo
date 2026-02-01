#!/usr/bin/env bash
set -euo pipefail

bash "$(dirname "$0")/cordova-ensure-platforms.sh" android

# Debug build is already signed with debug keystore (installable)
cordova build android --debug
