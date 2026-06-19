#!/usr/bin/env bash
# Build ai-devseed-pro-vX.Y.Z.zip from pro/ for Gumroad distribution.
#
# Usage:
#   scripts/build-pro-zip.sh            # uses pro-v* tag at HEAD
#   scripts/build-pro-zip.sh 0.1.0      # explicit version
#
# Output: dist/ai-devseed-pro-vX.Y.Z.zip

set -euo pipefail

# ----- Resolve version -----
VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
  if TAG="$(git describe --tags --match 'pro-v*' --exact-match 2>/dev/null)"; then
    VERSION="${TAG#pro-v}"
  else
    echo "ERROR: No version given and no pro-v* tag at HEAD." >&2
    echo "Usage: $0 [VERSION]                   # explicit, e.g. 0.1.0" >&2
    echo "   or: git tag pro-vX.Y.Z && $0       # tag-driven" >&2
    exit 1
  fi
fi

if [[ ! "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+([-+].*)?$ ]]; then
  echo "ERROR: Version must look like X.Y.Z (got: '$VERSION')" >&2
  exit 1
fi

# ----- Resolve paths -----
REPO_ROOT="$(git rev-parse --show-toplevel)"
PRO_DIR="$REPO_ROOT/pro"
DIST_DIR="$REPO_ROOT/dist"
RELEASE_NAME="ai-devseed-pro-v$VERSION"
STAGING="$DIST_DIR/$RELEASE_NAME"
ZIP="$DIST_DIR/$RELEASE_NAME.zip"

# ----- Validate pro/ structure -----
if [[ ! -d "$PRO_DIR" ]]; then
  echo "ERROR: pro/ not found at $PRO_DIR" >&2
  exit 1
fi

REQUIRED_FILES=(
  "$PRO_DIR/README.md"
  "$PRO_DIR/LICENSE"
  "$PRO_DIR/CHANGELOG.md"
)
for f in "${REQUIRED_FILES[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "ERROR: missing required file: ${f#$REPO_ROOT/}" >&2
    exit 1
  fi
done

if [[ ! -d "$PRO_DIR/commands" ]] || [[ ! -d "$PRO_DIR/adr-scenarios" ]]; then
  echo "ERROR: missing pro/commands/ or pro/adr-scenarios/" >&2
  exit 1
fi

# ----- Count + sanity-check content -----
CMD_COUNT=$(find "$PRO_DIR/commands" -maxdepth 1 -name '*.md' -type f | wc -l | tr -d ' ')
ADR_COUNT=$(find "$PRO_DIR/adr-scenarios" -maxdepth 1 -name '*.md' -type f | wc -l | tr -d ' ')

EXPECTED_CMDS=12
EXPECTED_ADRS=10

if [[ "$CMD_COUNT" -ne "$EXPECTED_CMDS" ]]; then
  echo "WARN: expected $EXPECTED_CMDS commands, found $CMD_COUNT" >&2
fi
if [[ "$ADR_COUNT" -ne "$EXPECTED_ADRS" ]]; then
  echo "WARN: expected $EXPECTED_ADRS ADR scenarios, found $ADR_COUNT" >&2
fi

# ----- Warn on dirty tree (don't block) -----
if ! git -C "$REPO_ROOT" diff --quiet -- "$PRO_DIR"; then
  echo "WARN: pro/ has uncommitted changes — zip will include working-tree state." >&2
fi

# ----- Build -----
echo "Building $RELEASE_NAME.zip"
echo "  commands:      $CMD_COUNT files"
echo "  adr-scenarios: $ADR_COUNT files"

rm -rf "$STAGING" "$ZIP"
mkdir -p "$STAGING"

cp "$PRO_DIR/README.md"    "$STAGING/"
cp "$PRO_DIR/LICENSE"      "$STAGING/"
cp "$PRO_DIR/CHANGELOG.md" "$STAGING/"
cp -r "$PRO_DIR/commands"      "$STAGING/"
cp -r "$PRO_DIR/adr-scenarios" "$STAGING/"

# Zip from inside dist/ so paths in the archive are relative to the release folder.
# Prefer `zip` (Unix standard); fall back to Python's zipfile (cross-platform default).
if command -v zip >/dev/null 2>&1; then
  ( cd "$DIST_DIR" && zip -rq "$RELEASE_NAME.zip" "$RELEASE_NAME" )
elif command -v python3 >/dev/null 2>&1; then
  ( cd "$DIST_DIR" && python3 -c "
import shutil, sys
shutil.make_archive('$RELEASE_NAME', 'zip', root_dir='.', base_dir='$RELEASE_NAME')
" )
elif command -v python >/dev/null 2>&1; then
  ( cd "$DIST_DIR" && python -c "
import shutil
shutil.make_archive('$RELEASE_NAME', 'zip', root_dir='.', base_dir='$RELEASE_NAME')
" )
else
  echo "ERROR: neither 'zip' nor 'python3'/'python' found in PATH." >&2
  echo "Install one of: zip (apt/brew/choco install zip) or Python 3." >&2
  exit 1
fi

rm -rf "$STAGING"

# ----- Report -----
SIZE=$(du -h "$ZIP" | cut -f1)
FILES_IN_ZIP=$(( 3 + CMD_COUNT + ADR_COUNT ))  # README + LICENSE + CHANGELOG + content

# SHA256 for CHANGELOG / Gumroad description
if command -v sha256sum >/dev/null 2>&1; then
  SHA="$(sha256sum "$ZIP" | awk '{print $1}')"
elif command -v shasum >/dev/null 2>&1; then
  SHA="$(shasum -a 256 "$ZIP" | awk '{print $1}')"
else
  SHA="(sha256 tool not found)"
fi

echo ""
echo "Built: ${ZIP#$REPO_ROOT/}"
echo "  size:    $SIZE"
echo "  files:   $FILES_IN_ZIP"
echo "  sha256:  $SHA"
echo ""
echo "Next:"
echo "  1. Verify archive (zip -T / unzip -t / python -m zipfile --test)"
echo "  2. Upload as $RELEASE_NAME.zip to the Gumroad product"
echo "  3. Add the SHA256 above to pro/CHANGELOG.md for the release entry"
