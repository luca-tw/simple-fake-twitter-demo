import { AuthGuard, CreateUserArgsDto, LoginUserArgsDto, UserId, UserService } from '@fake-twitter/user';
import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiProperty()
  @ApiOperation({ summary: '會員資料' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('/me')
  me(@UserId() userId: string) {
    if (!userId) {
      throw new BadRequestException();
    }
    return this.userService.findById(userId);
  }

  @ApiProperty()
  @ApiOperation({ summary: '會員註冊' })
  @Post('/')
  async register(@Body() args: CreateUserArgsDto) {
    return this.userService.register(args);
  }

  @ApiProperty()
  @ApiOperation({ summary: '會員登入' })
  @Post('/login')
  login(@Body() args: LoginUserArgsDto) {
    return this.userService.login(args);
  }
}
