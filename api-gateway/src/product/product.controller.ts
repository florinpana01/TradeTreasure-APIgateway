import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(
        // private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
        @Inject('TIMELINE_SERVICE') private timelineClient: ClientProxy
        ) {}
        @Get()
    async allProduct() {
        const result = await this.productClient.send('product_request_all', {});
        return result;
    }
        @Get('timeline')
    async allTimeline() {
        const result = await this.timelineClient.send('timeline_request_all', {});
        return result;
    }


    @Post('create')
    async create(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('user_id') user_id: number,
        @Body('category') category: string,
        @Body('price') price: string,
        ) {
            const result = this.productClient.send('product_created_gateway', {title, description, category, user_id, price});
            return result;
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const result = this.productClient.send('product_request_single', id)
        return result;
    }

    @Get('user/:user_id')
    async getByUser(@Param('user_id') user_id: number) {
        console.log(`getting all products for user ${user_id}`);
        const result = this.productClient.send('products_by_user_gateway', user_id);
        return result;
        //return this.productService.getByUser(userId);
    }

    @Get('category/:category')
    async getByCategory(@Param('category') category: string) {
        console.log(`getting all products from the ${category} section:`);
        const result = this.productClient.send('products_by_category_gateway', category);
        return result;
        //return this.productService.getByUser(userId);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('description') description: string,
    ){
        const result = this.productClient.send('product_updated_gateway', {id, title, description});
        return result;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        console.log('deleting product number: ', id);
        const result = this.productClient.send('product_deleted_gateway', id);
        return result;
    }
}
