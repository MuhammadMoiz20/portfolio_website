# Rental Frontend (React Native)

This is a minimal starter scaffold for a React Native frontend for a home rental marketplace.

Quick start

1. Install dependencies

   npm install

2. Start the Expo dev server

   npx expo start

This scaffold includes basic screens: Home and Details, and a small `PropertyCard` component.

Troubleshooting: Node / pnpm not found in VS Code terminal

1. Open a new integrated terminal in VS Code (Terminal → New Terminal). The workspace is configured to open a login `zsh` which will source your shell rc files (e.g. `~/.zshrc`, `~/.zprofile`).

2. Verify that `node` and `pnpm` are available:

   node -v
   pnpm -v

3. If either command is not found, common fixes:
   - If you use nvm: ensure `nvm` is initialized in `~/.zshrc` or `~/.zprofile`. You should have lines similar to:

     export NVM_DIR="$HOME/.nvm"
       [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

   - If you use Volta: ensure Volta's setup is present in your shell startup file. Volta typically adds to `~/.zshrc`:

     export VOLTA_HOME="$HOME/.volta"
       [ -s "$VOLTA_HOME/bin/volta" ] && export PATH="$VOLTA_HOME/bin:$PATH"

   - If you installed Node with Homebrew, ensure Homebrew's path is exported in your shell startup file (e.g. `export PATH="/opt/homebrew/bin:$PATH"`).

4. After updating your shell files, close and re-open the VS Code window or restart the integrated terminal to pick up changes.

If you still see issues I can (a) add a workspace-specific `.nvmrc` or `package.json` `engines` entry, (b) detect your local Node version and create Volta settings for the project, or (c) walk through fixing your shell startup files. Tell me which you'd prefer.
