import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs/promises';

const prisma = new PrismaClient();

async function seed() {
  try {
    // Read JSON file
    const filePath = path.resolve(__dirname, 'posts.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    // Insert data into the database
    for (const item of jsonData) {
      await prisma.post.create({
        data: {
          title: item.title,
          content: item.content,
          postedAt: new Date(item.postedAt),
          postedBy: item.postedBy,
          tags: { set: item.tags },
        },
      });
    }

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
