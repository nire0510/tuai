#!/usr/bin/env bash
# install.sh — install tuai globally as a *nix CLI tool
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TUAI_BIN="$SCRIPT_DIR/tuai"
INSTALL_TARGET="/usr/local/bin/tuai"

# Ensure the file is executable
chmod +x "$TUAI_BIN"

# Try to symlink into /usr/local/bin, fall back to ~/bin
if [ -w /usr/local/bin ]; then
  ln -sf "$TUAI_BIN" "$INSTALL_TARGET"
  echo "✅  Installed: $INSTALL_TARGET -> $TUAI_BIN"
else
  LOCAL_BIN="$HOME/.local/bin"
  mkdir -p "$LOCAL_BIN"
  ln -sf "$TUAI_BIN" "$LOCAL_BIN/tuai"
  echo "✅  Installed: $LOCAL_BIN/tuai -> $TUAI_BIN"
  echo ""
  echo "⚠️  Make sure $LOCAL_BIN is in your PATH:"
  echo "   echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.bashrc && source ~/.bashrc"
  echo "   # or for zsh:"
  echo "   echo 'export PATH=\"\$HOME/.local/bin:\$PATH\"' >> ~/.zshrc && source ~/.zshrc"
fi

echo ""
echo "Run  tuai <provider>  to launch the interactive autocomplete."
