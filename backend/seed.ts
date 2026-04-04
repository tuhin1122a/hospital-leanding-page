import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashPassword = async (pass: string) => bcrypt.hash(pass, 10);
  
  const pw = await hashPassword('demo123');

  await prisma.user.upsert({
    where: { email: 'admin@nurjahan.com' },
    update: { password: pw, role: 'ADMIN', name: 'Admin User' },
    create: { email: 'admin@nurjahan.com', password: pw, role: 'ADMIN', name: 'Admin User' },
  });

  await prisma.user.upsert({
    where: { email: 'doctor@nurjahan.com' },
    update: { password: pw, role: 'DOCTOR', name: 'Dr. Jane Smith' },
    create: { email: 'doctor@nurjahan.com', password: pw, role: 'DOCTOR', name: 'Dr. Jane Smith' },
  });

  await prisma.user.upsert({
    where: { email: 'receptionist@nurjahan.com' },
    update: { password: pw, role: 'RECEPTIONIST', name: 'Recp. Bob' },
    create: { email: 'receptionist@nurjahan.com', password: pw, role: 'RECEPTIONIST', name: 'Recp. Bob' },
  });

  console.log("Seeding completed!");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
