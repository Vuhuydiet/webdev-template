import prisma from './index.js';

import { getHashedPassword } from '../utils/cryptoUtils.js';

async function main() {
  const users = [
    { 
      username: 'Alice',
      password: getHashedPassword('password')
    },
    { 
      username: 'Bob',
      password: getHashedPassword('password')
    },
    { 
      username: 'Charlie',
      password: getHashedPassword('password')
    }
  ];

  await prisma.$transaction(async (prisma) => {
    await prisma.user.createMany({
      data: users
    });
  });

  console.log('Database has been seeded!');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
