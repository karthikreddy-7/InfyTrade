import { RankingsModule } from './Rankings/rankings.module';
import { CommunityModule } from './Community/community.module';
import { PortfoliosModule } from './Portfolios/portfolios.module';
import { MLmodelsModule } from './MLmodels/mlmodels.module';
import { StocksModule } from './Stocks/stocks.module';
import { WidgetsModule } from './Widgets/widgets.module';
import { DashboardsModule } from './Dashboards/dashboards.module';
import { UsersModule } from './Users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
UsersModule
,DashboardsModule,
WidgetsModule
,StocksModule,
MLmodelsModule
,PortfoliosModule,
CommunityModule
    ,RankingsModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
