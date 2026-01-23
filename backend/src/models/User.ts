// Usando Prisma ORM com Supabase PostgreSQL
// Os tipos são gerados automaticamente pelo Prisma
// Schema definido em: prisma/schema.prisma

export interface IUser {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  isPremium: boolean;
  vibes: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para resposta (sem password)
export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isPremium: boolean;
  vibes: string[];
}

