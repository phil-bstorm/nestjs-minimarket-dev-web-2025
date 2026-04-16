import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { LoginDto } from 'src/dtos/auth.form.dto';
import { UUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  async register(user: Omit<UserEntity, 'id' | 'role'>): Promise<UserEntity> {
    // vérifie si l'email n'existe pas déjà
    const existing = await this._userRepo.findOneBy({ email: user.email });
    if (existing) {
      throw new Error('Email already exists');
    }

    // encryption du "password"
    user.password = bcrypt.hashSync(user.password, 12);

    return this._userRepo.save(user);
  }

  async login(credentials: LoginDto): Promise<UserEntity> {
    const user = await this._userRepo.findOneBy({ email: credentials.email });
    if (!user) {
      throw new Error('Invalid credential');
    }

    if (!bcrypt.compareSync(credentials.password, user.password)) {
      throw new Error('Invalid credential');
    }

    return user;
  }

  async getById(id: UUID): Promise<UserEntity> {
    const user = await this._userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    return user;
  }
}
