// prisma/seed.ts
import prisma from './index.js';

async function main() {
  await prisma.user.createMany({
    data: [
      { 
        name: 'Alice',
        isAdmin: true,
        preferences: {}
      },
      { 
        name: 'Bob',
        isAdmin: false,
        preferences: {}
      },
      { 
        name: 'Charlie',
        isAdmin: false,
        preferences: {}
      }
    ]
  })

  console.log('Database has been seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
