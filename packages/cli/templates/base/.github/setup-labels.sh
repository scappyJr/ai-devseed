#!/bin/bash

# 🏷️ {{PROJECT_NAME}} - GitHub Labels Setup Script
#
# Usage:
#   1. Install GitHub CLI: https://cli.github.com
#   2. Authenticate: gh auth login
#   3. Run from project root: bash .github/setup-labels.sh

set -e

echo "🌱 Setting up {{PROJECT_NAME}} GitHub labels..."
echo ""

# ===== Type =====
echo "📌 Type labels..."
gh label create "type/bug" --color "D73A4A" --description "Something isn't working" --force
gh label create "type/feature" --color "A2EEEF" --description "New feature" --force
gh label create "type/enhancement" --color "84B6EB" --description "Improvement to existing" --force
gh label create "type/docs" --color "FEF2C0" --description "Documentation" --force
gh label create "type/question" --color "D876E3" --description "Question or discussion" --force

# ===== Priority =====
echo "📌 Priority labels..."
gh label create "priority/high" --color "B60205" --description "Urgent / important" --force
gh label create "priority/medium" --color "FBCA04" --description "Normal" --force
gh label create "priority/low" --color "0E8A16" --description "Nice to have" --force

# ===== Status =====
echo "📌 Status labels..."
gh label create "status/blocked" --color "B60205" --description "Blocked by external factor" --force
gh label create "status/in-progress" --color "0E8A16" --description "Being worked on" --force
gh label create "status/needs-review" --color "FBCA04" --description "Needs review/feedback" --force
gh label create "status/wontfix" --color "FFFFFF" --description "Won't be addressed" --force

# ===== Open source friendly =====
echo "📌 Community labels..."
gh label create "good first issue" --color "7057FF" --description "Good for newcomers" --force
gh label create "help wanted" --color "008672" --description "Extra attention is needed" --force

# ===== Effort =====
echo "📌 Effort labels..."
gh label create "effort/small" --color "C2E0C6" --description "Few hours" --force
gh label create "effort/medium" --color "FBCA04" --description "Day or two" --force
gh label create "effort/large" --color "D93F0B" --description "Multiple days" --force

# ===== Cleanup default labels =====
echo ""
echo "🗑️  Cleaning up GitHub default labels..."
gh label delete "bug" --yes 2>/dev/null || true
gh label delete "documentation" --yes 2>/dev/null || true
gh label delete "duplicate" --yes 2>/dev/null || true
gh label delete "enhancement" --yes 2>/dev/null || true
gh label delete "invalid" --yes 2>/dev/null || true
gh label delete "question" --yes 2>/dev/null || true
gh label delete "wontfix" --yes 2>/dev/null || true

echo ""
echo "✅ Labels setup complete!"
echo "👉 Check your GitHub repo Issues → Labels"
