#!/usr/bin/env bash
set -e
# instala um servidor estático pequeno
if ! command -v http-server &> /dev/null; then
  npm i -g http-server
fi
# sirva a pasta atual (ou "dist" se você tiver build)
http-server . -p ${PORT:-8080}
