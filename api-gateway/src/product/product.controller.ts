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
    async all() {
        const result = await this.timelineClient.send('product_request_all', {});
        return result;
    }

    @Post('create')
    async create(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('user_id') user_id: number,
        ) {
            const result = this.productClient.send('product_created_gateway', {title, description, user_id});
            return result;
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const result = this.timelineClient.send('product_request_single', {id})
        return result;
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
        const result = this.productClient.send('product_deleted_gateway', {id});
    }
}
