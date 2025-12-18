import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@clivus.com';
  const password = 'Admin@123';
  
  // Verificar se já existe
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log('✅ Usuário admin já existe');
    await prisma.$disconnect();
    return;
  }

  // Criar hash da senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criar usuário
  const user = await prisma.user.create({
    data: {
      email,
      name: 'Admin Clivus',
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  });

  console.log('✅ Usuário admin criado:', user.email);
  await prisma.$disconnect();
}

main()
  .catch((error) => {
    console.error('Erro:', error);
    process.exit(1);
  });
