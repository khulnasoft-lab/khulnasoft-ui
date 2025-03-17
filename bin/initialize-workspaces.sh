#!/usr/bin/env bash

# See https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html
set -e # Abort script at first error, when a command exits with non-zero status (except in until or while loops, if-tests, list constructs)
set -u # Attempt to use undefined variable outputs error message, and forces an exit
set -o pipefail # Causes a pipeline to return the exit status of the last command in the pipe that returned a non-zero return value.

if [[ -z "${GL_TOOLS_DIR:-}" ]]; then
  echo "This environment is not a GitLab Workspaces. Skipping setup step..."
  exit 0
else
  echo "Detected GitLab Workspaces environment. Running additional setup step..."
fi

# Install dependencies managed by asdf
asdf install

# Install dependencies managed by yarn
yarn install
