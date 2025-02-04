import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreatePromotionDTO } from './dto/create-promotion.dto';
import { PromotionService } from './promotion.service';
import { CreatePromotionCustomerDTO } from './dto/create-promotion-customer';

@Controller('promotion')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(HttpStatus.OK)
  createPromotion(@Req() req: Request, @Body() body: CreatePromotionDTO) {
    const user = req.user;
    return this.promotionService.createPromotion(user['userId'], body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/customer-type')
  @HttpCode(HttpStatus.OK)
  createPromotionCustomer(@Body() body: CreatePromotionCustomerDTO) {
    return this.promotionService.createPromotionCustomer(body);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllPromotions() {
    return this.promotionService.getAllPromotion();
  }

  @Get('/customer-type')
  getAllCustomerTypeValid() {
    return this.promotionService.getAllPromotionCustomerValid();
  }

  @Get('/customer-type/all')
  getAllCustomerType() {
    return this.promotionService.getAllPromotionCustomer();
  }

  @Get('/customer/:id')
  getCustomerType(@Param('id') id: string) {
    return this.promotionService.getPromotionCustomer(id);
  }
}
