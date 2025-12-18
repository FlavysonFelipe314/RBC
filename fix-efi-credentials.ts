import { prisma } from './lib/prisma';

async function fixCredentials() {
  try {
    console.log('Corrigindo credenciais EFI...\n');
    
    // Buscar config atual
    const currentConfig = await prisma.paymentGatewayConfig.findFirst({
      where: { gateway: 'efi', isActive: true },
    });
    
    if (!currentConfig) {
      console.log('Gateway EFI não encontrado');
      return;
    }
    
    // Remover prefixos das credenciais
    const cleanProductionKey = currentConfig.productionKey?.replace('Client_Id_', '') || '';
    const cleanProductionSecret = currentConfig.productionSecret?.replace('Client_Secret_', '') || '';
    const cleanSandboxKey = currentConfig.sandboxKey?.replace('Client_Id_', '') || '';
    const cleanSandboxSecret = currentConfig.sandboxSecret?.replace('Client_Secret_', '') || '';
    
    console.log('Credenciais ANTES:');
    console.log(`  Production Key: ${currentConfig.productionKey}`);
    console.log(`  Production Secret: ${currentConfig.productionSecret}`);
    
    console.log('\nCredenciais DEPOIS (sem prefixos):');
    console.log(`  Production Key: ${cleanProductionKey}`);
    console.log(`  Production Secret: ${cleanProductionSecret}`);
    
    // Atualizar no banco
    const result = await prisma.paymentGatewayConfig.updateMany({
      where: { gateway: 'efi', isActive: true },
      data: {
        productionKey: cleanProductionKey,
        productionSecret: cleanProductionSecret,
        sandboxKey: cleanSandboxKey,
        sandboxSecret: cleanSandboxSecret,
      }
    });
    
    console.log(`\n✓ ${result.count} registro(s) atualizado(s) com sucesso!`);
    
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixCredentials();
