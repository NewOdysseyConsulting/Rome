import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly validApiKeys = new Set<string>([
    process.env.API_KEY || 'test-key',
  ]);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'] as string | undefined;

    if (!apiKey || !this.validApiKeys.has(apiKey)) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true;
  }
}