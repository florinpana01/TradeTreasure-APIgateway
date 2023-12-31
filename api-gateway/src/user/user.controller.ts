import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {

  constructor(
    @Inject('USER_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async all() {
    const result = await this.client.send('user_request_all', {});
    return result;
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const result = await this.client.send('user_request_by_email', { email }).toPromise();
    console.log(result);
    return result;
  }

  @EventPattern('test')
  async hello() {
    console.log('  ');
  }

  @EventPattern('product_created')
  async helloNew(product: any) {
    console.log(product);
  }

  @Post('register')
  async register(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log('register');

    const result = this.client.send('user_created_gateway', { firstName, lastName, email, password: hashedPassword });
    return result;
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    console.log('id: ', id);
    const result = this.client.send('user_request_single', id);
    return result;
    // return this.userService.get(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const result = this.client.send('user_updated_gateway', { id, firstName, lastName, email, password });
    return result;
    // return this.userService.update(id, {
    //     firstName,
    //     lastName,
    //     email,
    //     password
    // });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = this.client.send('user_deleted_gateway', { id });
    return result;
    // return this.userService.delete(id);
  }
}
