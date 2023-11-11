import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('likes')
export class LikeController {
    constructor(
        @Inject('LIKE_SERVICE') private likeClient: ClientProxy) {
    }

    @Get()
    async all() {
        const result = this.likeClient.send("like_request_all", {});
        return result;
    }

    @Post()
    async create(
        @Body('productId') productId: number,
        @Body('userId') userId: number,
    ) {
        console.log('productId: ', productId, " userId: ", userId);
        const result = this.likeClient.send('like_created_gateway', {productId, userId});
        return result;
    }
    @Get(':id')
    async get(@Param('id') id: number) {
        const result = this.likeClient.send('like_request_single', {id})
        return result;
    }


    @Delete(':id')
    async delete(@Param('id') id: number) {
        const result = this.likeClient.send('like_deleted_gateway', id);
        return result;
    }
}
