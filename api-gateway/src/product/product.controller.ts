import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(
        // private productService: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
        ) {}
    @Get()
    async all() {
        // this.client.emit('test', 'IF you see this message, RabbitMQ works');
        // return this.productService.all();
        const result = await this.client.send('product_request_all', {});
        return result;
    }

    @Post()
    async create(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('user_id') user_id: number,
        ) {
            const result = this.client.send('product_created_gateway', {title, description, user_id});
            return result;
            // const product = await this.productService.create({
            //     title, 
            //     description,
            //     user_id
            // });

            // this.client.emit('product_created', product);

            // return product;

        // return this.productService.create({
        //     title,
        //     description,
        //     user_id
        // });
    }

    @Get(':id')
    async get(@Param('id') id: number){
        const result = this.client.send('post_request_single', {id})
        return result;
        // return this.productService.get(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('title') title: string,
        @Body('description') description: string,
    ){
        const result = this.client.send('product_updated_gateway', {id, title, description});
        return result;
        // await this.productService.update(id, {
        //     title,
        //     description
        // });

        // const product = await this.productService.get(id);

        // this.client.emit('product updated', product);

        // return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const result = this.client.send('product_deleted_gateway', {id});
        return result;
        // await this.productService.delete(id);

        // this.client.emit('product deleted', id);

    }
}
