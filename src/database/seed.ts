import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { DefaultUsers } from './entities/v1/user.entity';
import { ApiKeys } from './entities/api-keys.entity';
import { createHash, randomBytes } from 'crypto';

// TODO : Tworzenie podstawowych (wcześniejszych haseł, dla przykładu użycia tabeli)
// TODO : Tworzenie dodatkowego użytkownika

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  try {
    console.log('(✅) Połączono z bazą danych');

    const DefaultUsersRepository = dataSource.getRepository(DefaultUsers);
    const ApiKeysRepository = dataSource.getRepository(ApiKeys);

    //? Liczba kluczy do wygenerowania
    const keysToSeed = 3;

    //? Generowanie (keysToSeed) kluczy dla tabeli ApiKeys
    for (let i = 0; i < keysToSeed; i++) {
      const newKey = randomBytes(32).toString('hex');
      const validityTimeDate = new Date('2035-05-25');
      const apiKey = ApiKeysRepository.create({
        key: newKey,
        validityTime: validityTimeDate,
        isActive: false,
      });
      await ApiKeysRepository.save(apiKey);
      console.log(`(✅) Dodano klucz API: ${newKey}`);
    }

    // ? Funkcja hashująca hasło
    function hashClientPassword(password: string) {
      const hash = createHash('sha256');
      hash.update(password);
      return hash.digest('hex');
    }
    // ? Generowanie podstawowego użytkownika (klienta)
    const HashedClientPassword = hashClientPassword('Passwd123456@');
    const newDefaultClientUser = DefaultUsersRepository.create({
      firstName: 'Adam',
      lastName: 'Kowalski',
      email: 'adam.kowalski@vuxe.pl',
      password: HashedClientPassword,
    });

    await DefaultUsersRepository.save(newDefaultClientUser);
    console.log('(✅) Rolnik zasiał swoje pole ;)');
    process.exit(0);
  } catch (error) {
    console.error('(❗) Rolnik natknął się na kamień:', error);
    process.exit(3);
  }
}

seed();
