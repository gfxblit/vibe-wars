#!/bin/bash

FAIL=0

echo "Testing README.md content..."

if ! grep -q "## Game Design" README.md; then
  echo "❌ Missing 'Game Design' section"
  FAIL=1
fi

if ! grep -q "## Architecture" README.md; then
  echo "❌ Missing 'Architecture' section"
  FAIL=1
fi

if ! grep -q "src/state.ts" README.md; then
  echo "❌ Missing directory structure definition (src/state.ts)"
  FAIL=1
fi

if ! grep -q "Vitest" README.md; then
  echo "❌ Missing tech stack details (Vitest)"
  FAIL=1
fi

if [ $FAIL -eq 0 ]; then
  echo "✅ All checks passed!"
  exit 0
else
  echo "❌ Tests failed."
  exit 1
fi
