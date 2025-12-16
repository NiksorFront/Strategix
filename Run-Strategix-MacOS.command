#!/usr/bin/env bash
set -euo pipefail

pause() {
  echo
  read -n 1 -s -r -p "Нажмите любую клавишу для выхода..."
  echo
}

require_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "[ERROR] Команда '$1' не найдена."
    echo "$2"
    pause
    exit 1
  fi
}

require_cmd git  "Установите Xcode Command Line Tools (или Homebrew + git)."
require_cmd node "Установите Node.js (LTS): https://nodejs.org/"
require_cmd npm  "npm обычно ставится вместе с Node.js. Если его нет — переустановите Node.js."

REPO_URL="https://github.com/NiksorFront/Strategix.git"
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"
TARGET_DIR="$BASE_DIR/Strategix"

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "[INFO] Клонирую репозиторий в: $TARGET_DIR"
  git clone "$REPO_URL" "$TARGET_DIR"
else
  echo "[INFO] Папка уже существует: $TARGET_DIR"
fi

if [[ ! -d "$TARGET_DIR/.git" ]]; then
  echo "[ERROR] В папке нет .git. Удалите '$TARGET_DIR' и запустите снова."
  pause
  exit 1
fi

FRONTEND_DIR="$TARGET_DIR/frontend"
if [[ ! -f "$FRONTEND_DIR/package.json" ]]; then
  echo "[ERROR] Не найден frontend/package.json. Структура репозитория неожиданная."
  pause
  exit 1
fi

cd "$FRONTEND_DIR"

echo "[INFO] Устанавливаю зависимости..."
# Важно: npm ci может падать, если lock-файл не синхронизирован с package.json.
if [[ -f "package-lock.json" ]]; then
  set +e
  npm ci
  CI_EXIT=$?
  set -e
  if [[ $CI_EXIT -ne 0 ]]; then
    echo "[WARN] npm ci не удалось (lock-файл не синхронизирован). Перехожу на npm install..."
    npm install
  fi
else
  npm install
fi

echo "[INFO] Запуск dev-сервера..."
if [[ -x "node_modules/.bin/nuxi" ]]; then
  echo "[INFO] Nuxt обнаружен. Запускаю: npx nuxi dev"
  npx nuxi dev
else
  echo "[INFO] Запускаю: npm run dev"
  npm run dev
fi

pause
