import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import { AppModule } from 'src/app.module';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let userService: UsersService;
    let testUser: User;

    beforeAll(async () => {
        const hashedPassword = await bcrypt.hash('password123', 10);

        testUser = {
            id: 1,
            email: 'john@email.com',
            first_name: 'John',
            last_name: 'Doe',
            phone_number: 123456789,
            password: hashedPassword,
            licensePlateMembershipPlans: [],
            cards: [],
        };

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
        await app.init();

        userService = moduleFixture.get<UsersService>(UsersService);

        jest.spyOn(userService, 'findByEmail').mockImplementation(async (email: string) => {
            if (email === testUser.email) return testUser;
            return null;
        });
    });

    afterAll(async () => {
        await app.close();
    });


    describe('/auth/login (POST)', () => {
        it('should login successfully with valid credentials', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ email: 'john@email.com', password: 'password123' });

            expect(response.status).toBe(201);
            // Fix object comparison
            expect(response.body).toEqual(
                expect.objectContaining({
                    statusCode: 200, // was 201
                    message: 'login successful',
                    data: expect.objectContaining({
                        access_token: expect.any(String), // don't check exact token
                        user: {
                            id: testUser.id,
                            email: testUser.email,
                            first_name: testUser.first_name,
                            last_name: testUser.last_name,
                            phone_number: testUser.phone_number,
                        },
                    }),
                }),
            );
        });

        it('should return 400 when email is missing', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ password: 'password123' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                statusCode: 400,
                message: 'Missing or invalid values',
                values: ['email'],
            });
        });

        it('should return 400 when password is missing', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ email: 'john@email.com' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                statusCode: 400,
                message: 'Missing or invalid values',
                values: ['password'],
            });
        });

        it('should return 400 when user does not exist', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ email: 'notfound@email.com', password: 'password123' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                statusCode: 400,
                message: 'User does not exists',
            });
        });

        it('should return 401 when password is incorrect', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({ email: 'john@email.com', password: 'wrongpassword' });

            expect(response.status).toBe(400); // ✅ Correct
            expect(response.body).toEqual({
                statusCode: 401,
                message: 'Invalid credentials',
            });
        });

    });
});
