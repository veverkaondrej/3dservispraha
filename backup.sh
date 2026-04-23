#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p backups
stamp=$(date +%Y%m%d-%H%M%S)
dest="backups/index-${stamp}.html"
cp index.html "$dest"
echo "Záloha uložena: $dest"
