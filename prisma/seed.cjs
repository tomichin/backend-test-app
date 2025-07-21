const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.order.upsert({
    where: { orderId: '1' },
    update: {},
    create: {
      orderId: '1',
      orderNumber: 'R-TEST-001',
      totalPrice: 9876.54,
      paymentGateway: 'Manual Test',
      customerEmail: 'test@example.com',
      customerName: 'Test User',
      customerAddress: '123 Test St, Tokyo',
      tags: 'test,debug',
      createdAt: new Date(),
    },
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());