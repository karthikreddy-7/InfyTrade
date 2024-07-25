import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RankingsModule } from './Rankings/rankings.module';
import { CommunityModule } from './Community/community.module';
import { PortfoliosModule } from './Portfolios/portfolios.module';
import { MLmodelsModule } from './MLmodels/mlmodels.module';
import { StocksModule } from './Stocks/stocks.module';
import { WidgetsModule } from './Widgets/widgets.module';
import { DashboardsModule } from './Dashboards/dashboards.module';
import { UsersModule } from './Users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || 'localhost',
        port: parseInt(configService.get<string>('DB_PORT'), 10) || 5432,
        username: configService.get<string>('DB_USERNAME') || 'postgres',
        password: configService.get<string>('DB_PASSWORD') || 'root',
        database: configService.get<string>('DB_NAME') || 'postgres',
        ssl: configService.get<string>('DB_SSL_MODE') === 'require' || false,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    DashboardsModule,
    WidgetsModule,
    StocksModule,
    MLmodelsModule,
    PortfoliosModule,
    CommunityModule,
    RankingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
