import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  HttpStatus,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiCookieAuth, ApiHeader } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CheckoutService } from './checkout.service';
import { CheckoutPreviewDto } from './dto/checkout-preview.dto';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { CheckoutPreviewResponseDto } from './dto/checkout-response.dto';
import { JwtOptionalGuard } from '../auth/guards/jwt-optional.guard';

const CART_SESSION_COOKIE = 'cart_session_id';
const CART_SESSION_HEADER = 'x-cart-session-id';

@ApiTags('تسویه حساب')
@ApiBearerAuth('jwt')
@ApiCookieAuth(CART_SESSION_COOKIE)
@ApiHeader({
  name: CART_SESSION_HEADER,
  required: false,
  description: 'شناسه نشست سبد خرید برای کاربران مهمان',
})
@Controller('checkout')
@UseGuards(JwtOptionalGuard)
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  private getUserId(req: any): string | undefined {
    return req.user?.id;
  }

  private getSessionId(
    @Req() req: any,
    @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
  ): string | undefined {
    const cookieSessionId = req.cookies?.[CART_SESSION_COOKIE];
    return cookieSessionId || headerSessionId;
  }

  @Post('preview')
  @ApiOperation({
    summary: 'پیش‌نمایش تسویه حساب با محاسبه قیمت و اعتبارسنجی',
    description: 'خلاصه کامل تسویه حساب را بدون ایجاد سفارش یا شارژ مشتری برمی‌گرداند',
  })
  async preview(
    @Req() req: any,
    @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
    @Body() dto: CheckoutPreviewDto,
  ): Promise<CheckoutPreviewResponseDto> {
    const userId = this.getUserId(req);
    const sessionId = this.getSessionId(req, headerSessionId);

    const result = await this.checkoutService.preview(userId, sessionId, dto);
    return plainToInstance(CheckoutPreviewResponseDto, result, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'اعتبارسنجی تسویه حساب و آماده‌سازی برای ایجاد سفارش',
    description: 'درخواست تسویه حساب را اعتبارسنجی کرده و داده‌های تایید شده برای ماژول سفارش‌ها برمی‌گرداند',
  })
  async prepare(
    @Req() req: any,
    @Headers(CART_SESSION_HEADER) headerSessionId: string | undefined,
    @Body() dto: CreateCheckoutDto,
  ): Promise<any> {
    const userId = this.getUserId(req);
    const sessionId = this.getSessionId(req, headerSessionId);

    const result = await this.checkoutService.prepareCheckout(userId, sessionId, dto);
    return {
      success: true,
      data: result,
      message: 'تسویه حساب با موفقیت اعتبارسنجی شد. برای ایجاد سفارش آماده است.',
    };
  }
}