import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto, UpdateAdminDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async getAdminByEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepo.findOneBy({ email });
    if (!admin) {
      throw new NotFoundException('');
    }
    return admin;
  }

  async create(payload: CreateAdminDto): Promise<Admin> {
    const newAdmin = this.adminRepo.create(payload);
    return await this.adminRepo.save(newAdmin).catch((error) => {
      console.log(error);
      throw new ConflictException(error.message);
    });
  }

  async update(id: number, payload: UpdateAdminDto): Promise<Admin> {
    const admin = await this.adminRepo.findOneBy({ id });
    if (!admin) {
      throw new NotFoundException('');
    }
    this.adminRepo.merge(admin, payload);
    return await this.adminRepo.save(admin).catch((error) => {
      throw new ConflictException(error.message);
    });
  }
}
