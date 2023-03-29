import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();

async function main() {
  const createMany = await prisma.foodItem.createMany({
    data: [
      {
        name: 'Шопска салата',
        calories: 105,
        carbs: 4.8,
        fats: 9.2,
        proteins: 1.5,
      },
      {
        name: 'Кюфте',
        calories: 289,
        carbs: 11.8,
        fats: 21.1,
        proteins: 13,
      },
      {
        name: 'Хляб',
        calories: 267,
        carbs: 49.6,
        fats: 3.6,
        proteins: 8.2,
      },
    ],
  });

  console.log({ createMany });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
