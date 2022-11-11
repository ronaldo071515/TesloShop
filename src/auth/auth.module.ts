import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { User } from './entities/users.entity';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    ConfigModule,

    TypeOrmModule.forFeature([
      User
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.registerAsync({
      imports: [ ConfigModule ],/* Importamos el modulo */
      inject: [ ConfigService ],/* Inyectamos el servicio */
      useFactory: ( configService: ConfigService ) => {/* Hacemos la iyección de dependencias normal */
        /* console.log('JWT', process.env.JWT_SECRET);
        console.log('JWT-SERVICE', configService.get('JWT_SECRET')) || '0000'; */
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    }),

    /* JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn:'2h'
      }
    }) */
  ],
  exports: [
    TypeOrmModule, /* exporta la configuración del import */
    JwtStrategy, /* por si lo queremos validar(el token) */
    PassportModule,
    JwtModule
  ]
})
export class AuthModule {}
