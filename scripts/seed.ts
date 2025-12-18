import { PrismaClient, UserRole, UserPlan, DreGroup } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { seedDynamicFeatures } from '../prisma/seed/dynamicFeatures';
import { seedDynamicPlans } from '../prisma/seed/dynamicPlans';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  // ========================================
  // NOVO: SEED DE FEATURES E PLANOS DINÂMICOS
  // ========================================
  await seedDynamicFeatures();
  await seedDynamicPlans();
  console.log('');

  // ========================================
  // 1. CRIAR OS 4 USUÁRIOS DO SISTEMA
  // ========================================
  
  const users = [
    {
      name: 'SuperAdmin',
      email: 'admin@clivus.com.br',
      password: 'admin123',
      role: UserRole.SUPERADMIN,
      plan: null,
    },
    {
      name: 'Cliente Básico',
      email: 'basico@teste.com',
      password: 'senha123',
      role: UserRole.CLIENT,
      plan: UserPlan.BASIC,
    },
    {
      name: 'Cliente Intermediário',
      email: 'intermediario@teste.com',
      password: 'senha123',
      role: UserRole.CLIENT,
      plan: UserPlan.INTERMEDIATE,
    },
    {
      name: 'Cliente Avançado',
      email: 'avancado@teste.com',
      password: 'senha123',
      role: UserRole.CLIENT,
      plan: UserPlan.ADVANCED,
    },
  ];

  console.log('👥 Criando usuários...');
  for (const userData of users) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      console.log(`   ⚠️  Usuário ${userData.email} já existe`);
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await prisma.user.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          plan: userData.plan,
        },
      });
      console.log(`   ✅ Usuário ${userData.email} criado`);
    }
  }

  // ========================================
  // 1.3. CRIAR MÓDULOS DO SISTEMA
  // ========================================

  console.log('\n🧩 Criando módulos do sistema...');
  
  const modulesData = [
    // Módulos Financeiros Básicos
    { code: 'financeiro_basico', name: 'Financeiro Básico', description: 'Módulo básico de gestão financeira' },
    { code: 'contas', name: 'Contas Bancárias', description: 'Gestão de contas bancárias e carteiras' },
    { code: 'categorias', name: 'Categorias', description: 'Gestão de categorias de receitas e despesas' },
    { code: 'transacoes', name: 'Transações', description: 'Registro e controle de transações financeiras' },
    { code: 'dashboard_financeiro', name: 'Dashboard Financeiro', description: 'Visão geral das finanças' },
    
    // Módulos Financeiros Avançados
    { code: 'planejamento', name: 'Planejamento Financeiro', description: 'Planejamento e metas financeiras' },
    { code: 'dre', name: 'DRE', description: 'Demonstração do Resultado do Exercício' },
    { code: 'conciliacao_bancaria', name: 'Conciliação Bancária', description: 'Conciliação de extratos bancários' },
    { code: 'relatorios', name: 'Relatórios', description: 'Relatórios financeiros avançados' },
    { code: 'comparador_planejamento', name: 'Comparador de Planejamento', description: 'Comparação de períodos de planejamento' },
    
    // Ferramentas do Cliente
    { code: 'investimentos', name: 'Investimentos', description: 'Gestão de investimentos' },
    { code: 'pro_labore', name: 'Pró-Labore', description: 'Calculadora de pró-labore' },
    { code: 'precificacao', name: 'Precificação', description: 'Calculadora de precificação' },
    { code: 'custo_funcionario', name: 'Custo de Funcionário', description: 'Calculadora de custo de funcionário' },
    { code: 'compliance', name: 'Compliance', description: 'Gestão de obrigações fiscais' },
    { code: 'gestao_equipe', name: 'Gestão de Equipe', description: 'Gestão de membros da equipe' },
    
    // Módulos SuperAdmin
    { code: 'superadmin_overview', name: 'SuperAdmin - Overview', description: 'Visão geral do sistema' },
    { code: 'superadmin_clientes', name: 'SuperAdmin - Clientes', description: 'Gestão de clientes pagantes' },
    { code: 'superadmin_leads', name: 'SuperAdmin - Leads', description: 'Gestão de leads e remarketing' },
    { code: 'superadmin_vendas', name: 'SuperAdmin - Vendas', description: 'Gestão de vendas e assinaturas' },
    { code: 'superadmin_planos', name: 'SuperAdmin - Planos', description: 'Gestão de planos de assinatura' },
    { code: 'superadmin_gateways', name: 'SuperAdmin - Gateways', description: 'Configuração de gateways de pagamento' },
    { code: 'superadmin_anuncios', name: 'SuperAdmin - Anúncios', description: 'Gestão de anúncios internos' },
    { code: 'superadmin_configuracoes', name: 'SuperAdmin - Configurações', description: 'Configurações gerais do sistema' },
  ];

  for (const moduleData of modulesData) {
    const existing = await prisma.module.findUnique({
      where: { code: moduleData.code },
    });

    if (!existing) {
      await prisma.module.create({ data: moduleData });
      console.log(`   ✅ Módulo ${moduleData.name} criado`);
    } else {
      console.log(`   ⚠️  Módulo ${moduleData.code} já existe`);
    }
  }

  // ========================================
  // 1.4. CRIAR PLANOS (GENÉRICOS) E VINCULAR MÓDULOS
  // ========================================

  console.log('\n📦 Criando planos genéricos e vinculando módulos...');
  
  const plansGenericData = [
    {
      code: 'clivus_vitalicio_basico',
      name: 'Clivus Vitalício - Básico',
      description: 'Plano básico com módulos essenciais',
      billingType: 'lifetime',
      modules: [
        'financeiro_basico',
        'contas',
        'categorias',
        'transacoes',
        'dashboard_financeiro',
      ],
    },
    {
      code: 'clivus_vitalicio_intermediario',
      name: 'Clivus Vitalício - Intermediário',
      description: 'Plano intermediário com módulos avançados',
      billingType: 'lifetime',
      modules: [
        'financeiro_basico',
        'contas',
        'categorias',
        'transacoes',
        'dashboard_financeiro',
        'planejamento',
        'dre',
        'conciliacao_bancaria',
        'investimentos',
        'pro_labore',
        'precificacao',
      ],
    },
    {
      code: 'clivus_vitalicio_avancado',
      name: 'Clivus Vitalício - Avançado',
      description: 'Plano avançado com todos os módulos',
      billingType: 'lifetime',
      modules: [
        'financeiro_basico',
        'contas',
        'categorias',
        'transacoes',
        'dashboard_financeiro',
        'planejamento',
        'dre',
        'conciliacao_bancaria',
        'relatorios',
        'comparador_planejamento',
        'investimentos',
        'pro_labore',
        'precificacao',
        'custo_funcionario',
        'compliance',
        'gestao_equipe',
      ],
    },
  ];

  for (const planData of plansGenericData) {
    const existingPlan = await prisma.plan.findUnique({
      where: { code: planData.code },
    });

    let plan;
    if (!existingPlan) {
      plan = await prisma.plan.create({
        data: {
          code: planData.code,
          name: planData.name,
          description: planData.description,
          billingType: planData.billingType,
        },
      });
      console.log(`   ✅ Plano ${planData.name} criado`);
    } else {
      plan = existingPlan;
      console.log(`   ⚠️  Plano ${planData.code} já existe`);
    }

    // Vincular módulos ao plano
    for (const moduleCode of planData.modules) {
      const module = await prisma.module.findUnique({
        where: { code: moduleCode },
      });

      if (module) {
        const existingLink = await prisma.planModule.findUnique({
          where: {
            planId_moduleId: {
              planId: plan.id,
              moduleId: module.id,
            },
          },
        });

        if (!existingLink) {
          await prisma.planModule.create({
            data: {
              planId: plan.id,
              moduleId: module.id,
            },
          });
          console.log(`      → Módulo ${moduleCode} vinculado ao plano ${plan.name}`);
        }
      }
    }
  }

  // ========================================
  // 1.5. ATRIBUIR MÓDULOS AOS USUÁRIOS EXISTENTES
  // ========================================

  console.log('\n🔗 Atribuindo módulos aos usuários...');
  
  // Buscar usuários criados
  const basicUser = await prisma.user.findUnique({ where: { email: 'basico@teste.com' } });
  const intermediateUser = await prisma.user.findUnique({ where: { email: 'intermediario@teste.com' } });
  const advancedUser = await prisma.user.findUnique({ where: { email: 'avancado@teste.com' } });

  // Atribuir módulos do plano básico
  if (basicUser) {
    const basicPlan = await prisma.plan.findUnique({
      where: { code: 'clivus_vitalicio_basico' },
      include: { planModules: { include: { module: true } } },
    });

    if (basicPlan) {
      for (const pm of basicPlan.planModules) {
        const existing = await prisma.userModule.findUnique({
          where: {
            userId_moduleId: {
              userId: basicUser.id,
              moduleId: pm.module.id,
            },
          },
        });

        if (!existing) {
          await prisma.userModule.create({
            data: {
              userId: basicUser.id,
              moduleId: pm.module.id,
              source: 'plan',
            },
          });
        }
      }
      console.log(`   ✅ Módulos atribuídos para ${basicUser.email}`);
    }
  }

  // Atribuir módulos do plano intermediário
  if (intermediateUser) {
    const intermediatePlan = await prisma.plan.findUnique({
      where: { code: 'clivus_vitalicio_intermediario' },
      include: { planModules: { include: { module: true } } },
    });

    if (intermediatePlan) {
      for (const pm of intermediatePlan.planModules) {
        const existing = await prisma.userModule.findUnique({
          where: {
            userId_moduleId: {
              userId: intermediateUser.id,
              moduleId: pm.module.id,
            },
          },
        });

        if (!existing) {
          await prisma.userModule.create({
            data: {
              userId: intermediateUser.id,
              moduleId: pm.module.id,
              source: 'plan',
            },
          });
        }
      }
      console.log(`   ✅ Módulos atribuídos para ${intermediateUser.email}`);
    }
  }

  // Atribuir módulos do plano avançado
  if (advancedUser) {
    const advancedPlan = await prisma.plan.findUnique({
      where: { code: 'clivus_vitalicio_avancado' },
      include: { planModules: { include: { module: true } } },
    });

    if (advancedPlan) {
      for (const pm of advancedPlan.planModules) {
        const existing = await prisma.userModule.findUnique({
          where: {
            userId_moduleId: {
              userId: advancedUser.id,
              moduleId: pm.module.id,
            },
          },
        });

        if (!existing) {
          await prisma.userModule.create({
            data: {
              userId: advancedUser.id,
              moduleId: pm.module.id,
              source: 'plan',
            },
          });
        }
      }
      console.log(`   ✅ Módulos atribuídos para ${advancedUser.email}`);
    }
  }

  // ========================================
  // 1.6. CRIAR PLANOS DE ASSINATURA (SubscriptionPlan)
  // ========================================

  console.log('\n💳 Criando planos de assinatura...');
  
  const plansData = [
    {
      name: 'Básico',
      price: 97,
      features: JSON.stringify([
        'Dashboard Completo',
        'Separação PF/PJ',
        'Relatórios Básicos',
        'Suporte por Email'
      ]),
      maxUsers: 1,
      maxAccounts: 5,
    },
    {
      name: 'Intermediário',
      price: 197,
      features: JSON.stringify([
        'Tudo do Básico',
        'DRE Customizável',
        'Calculadora Pró-labore',
        'Suporte Prioritário',
        'Integrações Bancárias'
      ]),
      maxUsers: 3,
      maxAccounts: 15,
    },
    {
      name: 'Avançado',
      price: 397,
      features: JSON.stringify([
        'Tudo do Intermediário',
        'Controle de Investimentos',
        'Múltiplas Empresas',
        'Consultoria Mensal',
        'API de Integração'
      ]),
      maxUsers: 10,
      maxAccounts: null, // Ilimitado
    },
  ];

  for (const planData of plansData) {
    const existingPlan = await prisma.subscriptionPlan.findUnique({
      where: { name: planData.name },
    });

    if (existingPlan) {
      console.log(`   ⚠️  Plano ${planData.name} já existe`);
    } else {
      await prisma.subscriptionPlan.create({
        data: planData,
      });
      console.log(`   ✅ Plano ${planData.name} criado`);
    }
  }

  // ========================================
  // 2. CRIAR DADOS FICTÍCIOS PARA O CLIENTE BÁSICO
  // ========================================
  
  const basicClient = await prisma.user.findUnique({
    where: { email: 'basico@teste.com' },
  });

  if (!basicClient) {
    console.log('❌ Cliente Básico não encontrado');
    return;
  }

  console.log('\n💰 Criando contas bancárias para Cliente Básico...');
  
  const accountsData = [
    { name: 'Banco do Brasil', type: 'bank', initialValue: 50000 },
    { name: 'Nubank', type: 'bank', initialValue: 15000 },
    { name: 'Carteira Pessoal', type: 'cash', initialValue: 500 },
    { name: 'Investimentos CDB', type: 'investment', initialValue: 100000 },
  ];

  const accounts = [];
  for (const accountData of accountsData) {
    const existing = await prisma.bankAccount.findFirst({
      where: {
        userId: basicClient.id,
        name: accountData.name,
      },
    });

    if (existing) {
      console.log(`   ⚠️  Conta ${accountData.name} já existe`);
      accounts.push(existing);
    } else {
      const account = await prisma.bankAccount.create({
        data: {
          userId: basicClient.id,
          ...accountData,
        },
      });
      console.log(`   ✅ Conta ${accountData.name} criada`);
      accounts.push(account);
    }
  }

  console.log('\n📁 Criando categorias para Cliente Básico...');
  
  const categoriesData = [
    // RECEITAS PJ
    { name: 'Vendas de Produtos', type: 'income', color: '#10B981', dreGroup: DreGroup.REVENUE_GROSS, dreOrder: 1 },
    { name: 'Prestação de Serviços', type: 'income', color: '#059669', dreGroup: DreGroup.REVENUE_GROSS, dreOrder: 2 },
    { name: 'Impostos sobre Vendas', type: 'expense', color: '#EF4444', dreGroup: DreGroup.REVENUE_DEDUCTIONS, dreOrder: 3 },
    { name: 'Taxas e Comissões', type: 'expense', color: '#DC2626', dreGroup: DreGroup.REVENUE_DEDUCTIONS, dreOrder: 4 },
    
    // CUSTOS VARIÁVEIS
    { name: 'Matéria Prima', type: 'expense', color: '#F59E0B', dreGroup: DreGroup.COST_VARIABLE, dreOrder: 5 },
    { name: 'Embalagens', type: 'expense', color: '#D97706', dreGroup: DreGroup.COST_VARIABLE, dreOrder: 6 },
    { name: 'Frete e Logística', type: 'expense', color: '#B45309', dreGroup: DreGroup.COST_VARIABLE, dreOrder: 7 },
    
    // DESPESAS FIXAS
    { name: 'Aluguel', type: 'expense', color: '#8B5CF6', dreGroup: DreGroup.EXPENSE_FIXED, dreOrder: 8 },
    { name: 'Salários e Encargos', type: 'expense', color: '#7C3AED', dreGroup: DreGroup.EXPENSE_FIXED, dreOrder: 9 },
    { name: 'Marketing', type: 'expense', color: '#6D28D9', dreGroup: DreGroup.EXPENSE_FIXED, dreOrder: 10 },
    { name: 'Energia e Água', type: 'expense', color: '#5B21B6', dreGroup: DreGroup.EXPENSE_FIXED, dreOrder: 11 },
    { name: 'Internet e Telefone', type: 'expense', color: '#4C1D95', dreGroup: DreGroup.EXPENSE_FIXED, dreOrder: 12 },
    
    // OUTRAS RECEITAS/DESPESAS
    { name: 'Receitas Financeiras', type: 'income', color: '#06B6D4', dreGroup: DreGroup.OTHER_RESULTS, dreOrder: 13 },
    { name: 'Despesas Financeiras', type: 'expense', color: '#0891B2', dreGroup: DreGroup.OTHER_RESULTS, dreOrder: 14 },
    
    // CATEGORIAS PESSOAIS
    { name: 'Salário', type: 'income', color: '#22C55E', dreGroup: DreGroup.OTHER, dreOrder: 15 },
    { name: 'Alimentação', type: 'expense', color: '#EC4899', dreGroup: DreGroup.OTHER, dreOrder: 16 },
    { name: 'Transporte', type: 'expense', color: '#F472B6', dreGroup: DreGroup.OTHER, dreOrder: 17 },
    { name: 'Lazer', type: 'expense', color: '#FB923C', dreGroup: DreGroup.OTHER, dreOrder: 18 },
    { name: 'Saúde', type: 'expense', color: '#3B82F6', dreGroup: DreGroup.OTHER, dreOrder: 19 },
  ];

  const categories = [];
  for (const categoryData of categoriesData) {
    const existing = await prisma.category.findFirst({
      where: {
        userId: basicClient.id,
        name: categoryData.name,
        type: categoryData.type,
      },
    });

    if (existing) {
      console.log(`   ⚠️  Categoria ${categoryData.name} já existe`);
      categories.push(existing);
    } else {
      const category = await prisma.category.create({
        data: {
          userId: basicClient.id,
          ...categoryData,
        },
      });
      console.log(`   ✅ Categoria ${categoryData.name} criada`);
      categories.push(category);
    }
  }

  // Mapear categorias por nome para fácil acesso
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.name] = cat;
    return acc;
  }, {} as Record<string, typeof categories[0]>);

  console.log('\n💸 Criando transações para Cliente Básico (últimos 6 meses)...');
  
  const existingTransactions = await prisma.transaction.count({
    where: { userId: basicClient.id },
  });

  if (existingTransactions > 0) {
    console.log(`   ⚠️  ${existingTransactions} transações já existem`);
  } else {
    const now = new Date();
    const transactionsData = [];

    // Gerar transações para os últimos 6 meses
    for (let monthOffset = 5; monthOffset >= 0; monthOffset--) {
      const monthDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 15);
      
      // Crescimento de 5-8% ao mês
      const growthFactor = 1 + (0.05 + Math.random() * 0.03) * (5 - monthOffset);

      // RECEITAS PJ
      transactionsData.push(
        {
          accountId: accounts[0].id, // Banco do Brasil
          categoryId: categoryMap['Vendas de Produtos'].id,
          type: 'income',
          amount: Math.round(80000 * growthFactor),
          date: monthDate,
          description: `Vendas de produtos - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        },
        {
          accountId: accounts[1].id, // Nubank
          categoryId: categoryMap['Prestação de Serviços'].id,
          type: 'income',
          amount: Math.round(45000 * growthFactor),
          date: new Date(monthDate.getTime() + 2 * 24 * 60 * 60 * 1000),
          description: `Serviços prestados - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        }
      );

      // DEDUÇÕES
      transactionsData.push(
        {
          accountId: accounts[0].id,
          categoryId: categoryMap['Impostos sobre Vendas'].id,
          type: 'expense',
          amount: Math.round(12000 * growthFactor),
          date: new Date(monthDate.getTime() + 3 * 24 * 60 * 60 * 1000),
          description: `Impostos sobre vendas - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        },
        {
          accountId: accounts[1].id,
          categoryId: categoryMap['Taxas e Comissões'].id,
          type: 'expense',
          amount: Math.round(3500 * growthFactor),
          date: new Date(monthDate.getTime() + 4 * 24 * 60 * 60 * 1000),
          description: `Taxas de intermediação - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        }
      );

      // CUSTOS VARIÁVEIS
      transactionsData.push(
        {
          accountId: accounts[0].id,
          categoryId: categoryMap['Matéria Prima'].id,
          type: 'expense',
          amount: Math.round(35000 * growthFactor),
          date: new Date(monthDate.getTime() + 5 * 24 * 60 * 60 * 1000),
          description: `Compra de matéria prima - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        },
        {
          accountId: accounts[0].id,
          categoryId: categoryMap['Embalagens'].id,
          type: 'expense',
          amount: Math.round(5000 * growthFactor),
          date: new Date(monthDate.getTime() + 6 * 24 * 60 * 60 * 1000),
          description: `Compra de embalagens - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        },
        {
          accountId: accounts[1].id,
          categoryId: categoryMap['Frete e Logística'].id,
          type: 'expense',
          amount: Math.round(8000 * growthFactor),
          date: new Date(monthDate.getTime() + 7 * 24 * 60 * 60 * 1000),
          description: `Frete e entregas - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        }
      );

      // DESPESAS FIXAS (valores constantes)
      transactionsData.push(
        {
          accountId: accounts[0].id,
          categoryId: categoryMap['Aluguel'].id,
          type: 'expense',
          amount: 8000,
          date: new Date(monthDate.getTime() + 8 * 24 * 60 * 60 * 1000),
          description: `Aluguel do escritório - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        },
        {
          accountId: accounts[0].id,
          categoryId: categoryMap['Salários e Encargos'].id,
          type: 'expense',
          amount: 25000,
          date: new Date(monthDate.getTime() + 9 * 24 * 60 * 60 * 1000),
          description: `Folha de pagamento - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        },
        {
          accountId: accounts[1].id,
          categoryId: categoryMap['Marketing'].id,
          type: 'expense',
          amount: 5000,
          date: new Date(monthDate.getTime() + 10 * 24 * 60 * 60 * 1000),
          description: `Campanhas de marketing - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        },
        {
          accountId: accounts[0].id,
          categoryId: categoryMap['Energia e Água'].id,
          type: 'expense',
          amount: 1200,
          date: new Date(monthDate.getTime() + 11 * 24 * 60 * 60 * 1000),
          description: `Contas de energia e água - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        },
        {
          accountId: accounts[0].id,
          categoryId: categoryMap['Internet e Telefone'].id,
          type: 'expense',
          amount: 800,
          date: new Date(monthDate.getTime() + 12 * 24 * 60 * 60 * 1000),
          description: `Internet e telefonia - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        }
      );

      // OUTRAS RECEITAS/DESPESAS
      transactionsData.push(
        {
          accountId: accounts[3].id, // Investimentos
          categoryId: categoryMap['Receitas Financeiras'].id,
          type: 'income',
          amount: 2500,
          date: new Date(monthDate.getTime() + 13 * 24 * 60 * 60 * 1000),
          description: `Rendimento de investimentos - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        },
        {
          accountId: accounts[0].id,
          categoryId: categoryMap['Despesas Financeiras'].id,
          type: 'expense',
          amount: 500,
          date: new Date(monthDate.getTime() + 14 * 24 * 60 * 60 * 1000),
          description: `Tarifas bancárias - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: false,
        }
      );

      // TRANSAÇÕES PESSOAIS (PF)
      transactionsData.push(
        {
          accountId: accounts[1].id,
          categoryId: categoryMap['Salário'].id,
          type: 'income',
          amount: 15000,
          date: new Date(monthDate.getTime() + 15 * 24 * 60 * 60 * 1000),
          description: `Pró-labore - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: true,
        },
        {
          accountId: accounts[2].id, // Carteira
          categoryId: categoryMap['Alimentação'].id,
          type: 'expense',
          amount: 1200,
          date: new Date(monthDate.getTime() + 16 * 24 * 60 * 60 * 1000),
          description: `Supermercado e restaurantes - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: true,
        },
        {
          accountId: accounts[2].id,
          categoryId: categoryMap['Transporte'].id,
          type: 'expense',
          amount: 800,
          date: new Date(monthDate.getTime() + 17 * 24 * 60 * 60 * 1000),
          description: `Combustível e transporte - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: true,
        },
        {
          accountId: accounts[2].id,
          categoryId: categoryMap['Lazer'].id,
          type: 'expense',
          amount: 600,
          date: new Date(monthDate.getTime() + 18 * 24 * 60 * 60 * 1000),
          description: `Entretenimento - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: true,
        },
        {
          accountId: accounts[1].id,
          categoryId: categoryMap['Saúde'].id,
          type: 'expense',
          amount: 500,
          date: new Date(monthDate.getTime() + 19 * 24 * 60 * 60 * 1000),
          description: `Plano de saúde - ${monthDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}`,
          isPersonal: true,
        }
      );
    }

    // Criar todas as transações
    for (const transactionData of transactionsData) {
      await prisma.transaction.create({
        data: {
          userId: basicClient.id,
          ...transactionData,
        },
      });
    }
    
    console.log(`   ✅ ${transactionsData.length} transações criadas`);
  }

  // ========================================
  // RESUMO FINAL
  // ========================================
  
  console.log('\n📊 RESUMO DO SEED:');
  const finalUsers = await prisma.user.count();
  const finalAccounts = await prisma.bankAccount.count();
  const finalCategories = await prisma.category.count();
  const finalTransactions = await prisma.transaction.count();
  
  console.log(`   👥 Usuários: ${finalUsers}`);
  console.log(`   💰 Contas: ${finalAccounts}`);
  console.log(`   📁 Categorias: ${finalCategories}`);
  console.log(`   💸 Transações: ${finalTransactions}`);
  
  console.log('\n✅ Seed concluído com sucesso!\n');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
