import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'get hello string' })
  @ApiResponse({ status: 200, description: 'get success', type: String })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'signin' })
  @UseGuards(AuthGuard('local'))
  @Post('auth/signin')
  async signin(@Request() req) {
    return req.user;
  }
}
