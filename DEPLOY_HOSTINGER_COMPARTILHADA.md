# Guia de Deploy no Hostinger - Hospedagem Compartilhada

Este guia explica como fazer o build e deploy da aplicação Next.js em **hospedagem compartilhada** no Hostinger usando **static export**.

## ⚠️ Importante: Hospedagem Compartilhada

Em hospedagem compartilhada:
- ✅ Não precisa de Node.js rodando no servidor
- ✅ Não precisa de PM2 ou processos em background
- ✅ Funciona apenas com arquivos estáticos (HTML, CSS, JS)
- ❌ Não pode usar API Routes do Next.js
- ❌ Não pode usar Server Components com dados dinâmicos do servidor
- ❌ Não pode usar recursos que precisam de Node.js no servidor

## Pré-requisitos

1. Acesso ao File Manager do Hostinger (hPanel)
2. Computador local com Node.js instalado (para fazer o build)
3. Git instalado (opcional, mas recomendado)

## Passo 1: Preparar o Build Localmente

### 1.1 Instalar Dependências

```bash
# No diretório do projeto
yarn install
# ou
npm install
```

### 1.2 Fazer o Build Estático

```bash
# Gerar o build estático
yarn build
# ou
npm run build
```

Isso criará uma pasta `out` na raiz do projeto com todos os arquivos estáticos prontos para upload.

### 1.3 Verificar a Pasta `out`

Após o build, você verá uma estrutura assim:

```
out/
├── index.html
├── _next/
│   ├── static/
│   └── ...
├── favicon.svg
├── logo.png
└── ... (outros arquivos estáticos)
```

## Passo 2: Preparar Arquivos para Upload

### 2.1 Copiar o arquivo .htaccess

O arquivo `.htaccess` já está configurado no projeto. Você precisará copiá-lo para a pasta `out`:

```bash
# No Windows (PowerShell)
Copy-Item .htaccess out\.htaccess

# No Linux/Mac
cp .htaccess out/.htaccess
```

### 2.2 Verificar Arquivos Necessários

Certifique-se de que todos os arquivos da pasta `public` foram copiados para `out`. O Next.js faz isso automaticamente.

## Passo 3: Fazer Upload para o Hostinger

### Opção A: Via File Manager (hPanel)

1. Acesse o **hPanel** do Hostinger
2. Vá em **File Manager**
3. Navegue até `public_html` (ou `domains/seu-dominio.com/public_html`)
4. **IMPORTANTE**: Se já houver arquivos, faça backup primeiro!
5. Selecione todos os arquivos antigos e delete (ou mova para uma pasta de backup)
6. Faça upload de **TODOS** os arquivos da pasta `out`:
   - Selecione todos os arquivos da pasta `out`
   - Faça upload para `public_html`
   - Aguarde o upload completar

### Opção B: Via FTP/SFTP

```bash
# Usando FileZilla ou similar
# Conecte-se ao servidor FTP do Hostinger
# Navegue até public_html
# Faça upload de todos os arquivos da pasta out
```

### Opção C: Via Git (se configurado)

```bash
# No servidor (se tiver acesso SSH limitado)
cd ~/domains/seu-dominio.com/public_html
git pull origin main
# Copiar arquivos da pasta out para public_html
```

## Passo 4: Configurar o .htaccess

1. Certifique-se de que o arquivo `.htaccess` está na raiz do `public_html`
2. Se necessário, edite o `.htaccess` para forçar HTTPS (descomente as linhas se tiver SSL):

```apache
# Descomente estas linhas se tiver SSL configurado
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

## Passo 5: Verificar o Deploy

1. Acesse seu domínio no navegador
2. Verifique se o site está carregando corretamente
3. Teste a navegação entre páginas
4. Verifique o console do navegador para erros

## Passo 6: Configurar Variáveis de Ambiente (se necessário)

Se você usa variáveis de ambiente no frontend (com `NEXT_PUBLIC_`), elas precisam ser definidas **antes** do build:

1. Crie um arquivo `.env.local` no projeto
2. Adicione as variáveis:

```env
NEXT_PUBLIC_APP_URL=https://seu-dominio.com
# Outras variáveis NEXT_PUBLIC_*
```

3. Faça o build novamente: `yarn build`
4. Faça upload novamente da pasta `out`

## Atualizações Futuras

Para atualizar o site:

```bash
# 1. Fazer alterações no código
# 2. Fazer novo build
yarn build

# 3. Fazer upload da pasta out novamente
# (substitua os arquivos antigos pelos novos)
```

## Estrutura de Arquivos no Servidor

Após o deploy, a estrutura no `public_html` deve ser:

```
public_html/
├── .htaccess
├── index.html
├── _next/
│   └── static/
│       └── ...
├── favicon.svg
├── logo.png
└── ... (outros arquivos estáticos)
```

## Troubleshooting

### Problema: Página 404 ao acessar rotas

**Solução**: Verifique se o `.htaccess` está configurado corretamente e se o `RewriteEngine On` está ativo.

### Problema: CSS/JS não carregam

**Solução**: 
- Verifique se a pasta `_next` foi enviada completamente
- Verifique as permissões dos arquivos (devem ser 644)
- Verifique o console do navegador para ver qual arquivo está faltando

### Problema: Imagens não aparecem

**Solução**: 
- Verifique se todos os arquivos da pasta `public` foram copiados
- Verifique os caminhos das imagens no código (devem começar com `/`)

### Problema: Erro 500

**Solução**: 
- Verifique os logs de erro no hPanel
- Verifique se o `.htaccess` está correto
- Tente remover o `.htaccess` temporariamente para testar

### Problema: Site muito lento

**Solução**: 
- O `.htaccess` já inclui compressão GZIP e cache
- Verifique se está funcionando corretamente
- Considere usar um CDN (Cloudflare, etc.)

## Limitações da Hospedagem Compartilhada

Lembre-se que em hospedagem compartilhada você **não pode**:

1. ❌ Usar API Routes (`/api/*`)
2. ❌ Usar Server Actions
3. ❌ Usar `getServerSideProps` ou `getStaticProps` com revalidação
4. ❌ Usar recursos que precisam de Node.js no servidor
5. ❌ Conectar diretamente ao banco de dados do servidor

Se precisar desses recursos, considere:
- Upgrade para VPS ou Cloud Hosting
- Usar serviços externos (Vercel, Netlify, etc.)
- Usar APIs externas para funcionalidades do servidor

## Vantagens do Static Export

✅ **Performance**: Arquivos estáticos são muito rápidos  
✅ **Custo**: Hospedagem compartilhada é mais barata  
✅ **Simplicidade**: Não precisa gerenciar servidor Node.js  
✅ **Escalabilidade**: Fácil de usar com CDN  
✅ **Segurança**: Menos superfície de ataque  

## Próximos Passos

1. ✅ Configure SSL/HTTPS no Hostinger
2. ✅ Configure domínio personalizado (se ainda não tiver)
3. ✅ Configure Google Analytics e Google Tag Manager (já configurado no código)
4. ✅ Teste todas as funcionalidades do site
5. ✅ Configure backup automático (se disponível no Hostinger)

---

**Dúvidas?** Consulte a documentação do Hostinger ou entre em contato com o suporte.

