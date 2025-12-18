import { prisma } from '../lib/db';

async function fixPixKey() {
  try {
    console.log('Configurando chave PIX no gateway EFI...\n');
    
    // Atualizar o gateway EFI com uma chave PIX
    const result = await prisma.paymentGatewayConfig.updateMany({
      where: { gateway: 'efi', isActive: true },
      data: {
        pixKey: '6a2b826a-c6a0-4ed9-ad89-77e7d5f9d3c0' // Chave PIX gerada aleatoriamente para testes
      }
    });
    
    console.log('✓ Chave PIX configurada com sucesso!');
    console.log(`  Registros atualizados: ${result.count}`);
    
    // Verificar a configuração
    const gateway = await prisma.paymentGatewayConfig.findFirst({
      where: { gateway: 'efi', isActive: true }
    });
    
    if (gateway) {
      console.log('\nConfiguração atual:');
      console.log(`  Gateway: ${gateway.gateway}`);
      console.log(`  Ambiente: ${gateway.environment}`);
      console.log(`  PIX Key: ${gateway.pixKey}`);
    }
    
  } catch (error) {
    console.error('Erro ao configurar PIX key:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixPixKey();

