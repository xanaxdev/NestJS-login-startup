import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiKeys } from 'src/database/entities/api-keys.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LicenseGuard implements CanActivate {
  constructor(
    @InjectRepository(ApiKeys)
    private readonly apiKeysRepository: Repository<ApiKeys>,
  ) {}

  // ? Main async for checking license.
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    //? Fetch API Key from Query / Body requests.
    const license = request.query.license || request.body.license;

    //! Return ERROR if the key was not sent in the query
    if (!license) {
      throw new HttpException(
        'The query does not show the value corresponding to the license key.',
        HttpStatus.FORBIDDEN,
      );
    }

    //! Verify the license key in the database
    const apiKey = await this.apiKeysRepository.findOne({
      where: { key: license, isActive: true },
    });

    //! Response if API Key is WRONG.
    if (!apiKey) {
      throw new HttpException(
        'The key what you are sending is incorrect.',
        HttpStatus.FORBIDDEN,
      );
    }

    //! If License key is expired
    const currentTime = new Date();
    if (apiKey.validityTime < currentTime) {
      throw new HttpException(
        'The key you are sending has expired and is no longer active.',
        HttpStatus.FORBIDDEN,
      );
    }

    //! Proceed if all is good.
    return true;
  }
}
