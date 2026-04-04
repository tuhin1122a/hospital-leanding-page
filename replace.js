const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Backgrounds
  content = content.replace(/bg-white/g, 'bg-card');
  content = content.replace(/bg-zinc-50/g, 'bg-muted');
  content = content.replace(/bg-zinc-100/g, 'bg-secondary');
  content = content.replace(/bg-zinc-950/g, 'bg-foreground');
  content = content.replace(/bg-zinc-900/g, 'bg-foreground/90');
  content = content.replace(/bg-zinc-800/g, 'hover:bg-foreground/80');

  // Text colors
  content = content.replace(/text-zinc-900/g, 'text-card-foreground');
  content = content.replace(/text-zinc-600/g, 'text-muted-foreground');
  content = content.replace(/text-zinc-500/g, 'text-muted-foreground');
  content = content.replace(/text-zinc-400/g, 'text-muted-foreground/70');
  content = content.replace(/text-white/g, 'text-primary-foreground');

  // Borders
  content = content.replace(/border-white/g, 'border-card');
  content = content.replace(/border-zinc-50/g, 'border-border/50');
  content = content.replace(/border-zinc-100\/50/g, 'border-border/50');
  content = content.replace(/border-zinc-100/g, 'border-border');
  content = content.replace(/border-zinc-200/g, 'border-border');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log('Updated: ' + filePath);
  }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

processDir('./app/dashboard');
processDir('./components/dashboard');
