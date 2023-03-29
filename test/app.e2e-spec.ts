import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { useContainer } from 'class-validator';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const patientsData = [
    {
      id: 1001,
      firstName: 'Димитър',
      lastName: 'Димитров',
    },
  ];

  const foodItemData = [
    {
      id: 1001,
      name: 'Шопска салата',
      calories: 105,
      carbs: 4.8,
      fats: 9.2,
      proteins: 1.5,
    },
    {
      id: 1002,
      name: 'Кюфте',
      calories: 289,
      carbs: 11.8,
      fats: 21.1,
      proteins: 13,
    },
    {
      id: 1003,
      name: 'Хляб',
      calories: 267,
      carbs: 49.6,
      fats: 3.6,
      proteins: 8.2,
    },
  ];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await app.init();

    const patient = await prisma.patient.create({
      data: patientsData[0],
    });

    console.log({ patient });

    await prisma.foodItem.createMany({
      data: foodItemData,
    });
  });

  describe('GET /patients', () => {
    it('returns a list of active patients', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        '/patients',
      );

      expect(status).toBe(200);
      expect(body).toHaveLength(1);

      const patient = body[0];
      expect(patient).toMatchObject(patientsData[0]);
      expect(patient.deletedAt).toBeNull();
    });
  });

  describe('POST /patients', () => {
    it('creates a patient', async () => {
      const beforeCount = await prisma.patient.count();

      const { status } = await request(app.getHttpServer())
        .post('/patients')
        .send({ firstName: 'Асен', lastName: 'Михайлов' });

      const afterCount = await prisma.patient.count();

      expect(status).toBe(201);
      expect(afterCount - beforeCount).toBe(1);
    });

    it('fails to create a patient without firstName', async () => {
      const { status } = await request(app.getHttpServer())
        .post('/patients')
        .send({ lastName: 'Кунев' });

      expect(status).toBe(400);
    });
  });

  describe('GET /patients/{id}', () => {
    it('returns a given patient', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/patients/${patientsData[0].id}`,
      );

      expect(status).toBe(200);
      expect(body).toMatchObject(patientsData[0]);
    });

    it('fails to return non existing user', async () => {
      const { status } = await request(app.getHttpServer()).get(
        `/patients/100`,
      );

      expect(status).toBe(404);
    });

    it('fails to return patient with invalid id type', async () => {
      const { status } = await request(app.getHttpServer()).get(
        `/patients/string-id`,
      );

      expect(status).toBe(400);
    });
  });
});
