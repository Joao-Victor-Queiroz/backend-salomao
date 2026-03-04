import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(AuthGuard('local'))
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return req.animador;
  // }
  // // @Get()
  // // getHello(): string {
  // //   return this.appService.getHello();
  // // }
}
