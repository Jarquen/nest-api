import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {UsersModule} from '../users/users.module';
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./strategies/local.strategy";
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './constants';
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
    imports: [forwardRef(() => UsersModule),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1h'},
        }),],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
