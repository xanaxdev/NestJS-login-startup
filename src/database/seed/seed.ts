import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { DefaultUsers } from '../entities/v1/user.entity';
import { ApiKeys } from '../entities/api-keys.entity';
import { createHash, randomBytes } from 'crypto';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    console.log('Połączono z bazą danych');

    const DefaultUsersRepository = dataSource.getRepository(DefaultUsers);
    const ApiKeysRepository = dataSource.getRepository(ApiKeys);

    //? Liczba kluczy do wygenerowania
    const keysToSeed = 3;

    //? Generowanie (keysToSeed) kluczy dla tabeli ApiKeys
    for (let i = 0; i < keysToSeed; i++) {
      const newKey = randomBytes(32).toString('hex');
      const apiKey = ApiKeysRepository.create({ key: newKey, isActive: false });
      await ApiKeysRepository.save(apiKey);
      console.log(`Dodano klucz API: ${newKey}`);
    }

    // ? Generowanie podstawowego użytkownika (klienta)

    // ? Funkcja hashująca hasło
    function hashClientPassword(password: string) {
      const hash = createHash('sha256');
      hash.update(password);
      return hash.digest('hex');
    }

    const HashedClientPassword = hashClientPassword('Passwd123456@');
    const newDefaultClientUser = DefaultUsersRepository.create({
      firstName: 'Adam',
      lastName: 'Kowalski',
      email: 'adam.kowalski@vuxe.pl',
      password: HashedClientPassword,
    });

    await DefaultUsersRepository.save(newDefaultClientUser);
    // ? Generowanie podstawowego użytkownika (księgowa)
    // ? Generowanie podstawowego użytkownika (prawnik)
    // ? Generowanie podstawowego użytkownika (administrator)

    console.log('Rolnik zasiał swoje pole ;)');
    process.exit(0);
  } catch (error) {
    console.error('Rolnik natknął się na kamień:', error);
    process.exit(3);
  }
}

seed();
