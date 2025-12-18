#!/usr/bin/env node

/**
 * Script para preparar arquivos para deploy em hospedagem compartilhada
 * 
 * Uso: node scripts/prepare-deploy.js
 * ou: yarn prepare:deploy
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const htaccessSource = path.join(__dirname, '..', '.htaccess');
const htaccessDest = path.join(outDir, '.htaccess');

console.log('🚀 Preparando arquivos para deploy...\n');

// Verificar se a pasta out existe
if (!fs.existsSync(outDir)) {
  console.error('❌ Erro: A pasta "out" não existe!');
  console.log('💡 Execute "yarn build" primeiro para gerar os arquivos estáticos.\n');
  process.exit(1);
}

// Copiar .htaccess para a pasta out
if (fs.existsSync(htaccessSource)) {
  try {
    fs.copyFileSync(htaccessSource, htaccessDest);
    console.log('✅ Arquivo .htaccess copiado para a pasta out/');
  } catch (error) {
    console.error('❌ Erro ao copiar .htaccess:', error.message);
    process.exit(1);
  }
} else {
  console.warn('⚠️  Arquivo .htaccess não encontrado na raiz do projeto');
}

// Listar arquivos principais
console.log('\n📁 Arquivos prontos para upload:');
const files = fs.readdirSync(outDir);
files.forEach(file => {
  const filePath = path.join(outDir, file);
  const stats = fs.statSync(filePath);
  if (stats.isDirectory()) {
    console.log(`   📂 ${file}/`);
  } else {
    const size = (stats.size / 1024).toFixed(2);
    console.log(`   📄 ${file} (${size} KB)`);
  }
});

console.log('\n✨ Preparação concluída!');
console.log('\n📤 Próximos passos:');
console.log('   1. Faça upload de TODOS os arquivos da pasta "out" para public_html');
console.log('   2. Certifique-se de que o arquivo .htaccess está incluído');
console.log('   3. Verifique se o site está funcionando corretamente\n');

