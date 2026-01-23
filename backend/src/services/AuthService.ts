import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database.js';
import { config } from '../config/index.js';
import { IUserResponse } from '../models/User.js';

export class AuthService {
  async register(email: string, password: string, name: string) {
    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);

    // Criar novo usuário
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Gerar token
    const token = this.generateToken(user.id);

    return {
      user: this.formatUserResponse(user),
      token,
    };
  }

  async login(email: string, password: string) {
    // Encontrar usuário
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Usuário ou senha inválidos');
    }

    // Gerar token
    const token = this.generateToken(user.id);

    return {
      user: this.formatUserResponse(user),
      token,
    };
  }

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return this.formatUserResponse(user);
  }

  async updateUser(userId: string, data: {
    name?: string;
    avatar?: string;
    vibes?: string[];
  }) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return this.formatUserResponse(user);
  }

  private generateToken(userId: string): string {
    return jwt.sign({ userId }, config.jwtSecret as string, {
      expiresIn: config.jwtExpire,
    } as any);
  }

  private formatUserResponse(user: any): IUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      isPremium: user.isPremium,
      vibes: user.vibes,
    };
  }
}

export default new AuthService();
