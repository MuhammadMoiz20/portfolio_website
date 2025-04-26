const fs = require('fs');
const path = require('path');
const strip = require('strip-comments');

const SRC_DIRS = ['components', 'data'];
const OUT_DIR = 'stripped';
const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function processFile(srcPath, destPath) {
  const code = fs.readFileSync(srcPath, 'utf8');
  const stripped = strip(code, { block: true, line: true, preserveNewlines: false });
  ensureDirSync(path.dirname(destPath));
  fs.writeFileSync(destPath, stripped, 'utf8');
}

function processDir(srcDir, destDir) {
  fs.readdirSync(srcDir, { withFileTypes: true }).forEach((entry) => {
    const srcEntry = path.join(srcDir, entry.name);
    const destEntry = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      processDir(srcEntry, destEntry);
    } else if (EXTENSIONS.includes(path.extname(entry.name))) {
      processFile(srcEntry, destEntry);
    }
  });
}

SRC_DIRS.forEach((dir) => {
  const srcPath = path.join(__dirname, '..', dir);
  const destPath = path.join(__dirname, '..', OUT_DIR, dir);
  if (fs.existsSync(srcPath)) {
    processDir(srcPath, destPath);
  }
});

console.log('All comments stripped and files output to', OUT_DIR);
