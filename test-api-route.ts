import { prisma } from './lib/prisma';

async function testAPI() {
  try {
    console.log('=== TESTE DA ROTA /api/superadmin/gateways ===\n');
    
    console.log('1. Buscando configs do banco de dados...');
    const configs = await prisma.paymentGatewayConfig.findMany({
      orderBy: [{ gateway: 'asc' }, { environment: 'asc' }],
    });
    
    console.log('Configs encontradas:', configs.length);
    console.log('Dados:', JSON.stringify({ configs }, null, 2));
    
  } catch (error: any) {
    console.error('ERRO:', error);
    console.error('Stack:', error.stack);
  } finally {
    await prisma.$disconnect();
  }
}

testAPI();
