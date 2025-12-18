/**
 * Script de inicialização de webhooks
 * Verifica e registra webhooks automaticamente
 * 
 * Execução:
 * yarn tsx --require dotenv/config scripts/init-webhooks.ts
 */

import { ensureWebhookRegistered } from '../lib/efi-webhook';

async function main() {
  console.log('[INIT WEBHOOKS] Iniciando verificação de webhooks...');

  try {
    // URL do webhook
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://clivus.marcosleandru.com.br';
    const webhookUrl = `${baseUrl}/api/efi/webhook`;

    console.log(`[INIT WEBHOOKS] URL do webhook: ${webhookUrl}`);

    // Verificar e registrar webhook da Efi
    await ensureWebhookRegistered(webhookUrl);

    console.log('[INIT WEBHOOKS] Verificação concluída com sucesso!');
  } catch (error) {
    console.error('[INIT WEBHOOKS ERROR]', error);
    process.exit(1);
  }
}

main();
