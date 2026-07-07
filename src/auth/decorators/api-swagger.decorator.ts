import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { SignInResponseDto } from '../dto/sign-in-response.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';
import { MessageResponseDto } from '../dto/message-response.dto';
import { AnimadorResponseDto } from '../../animadores/dto/animador-response.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';

export function ApiSignupDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cadastro de animador',
      description: 'Realiza o cadastro de um novo animador no sistema.',
    }),
    ApiCreatedResponse({
      description: 'Animador cadastrado com sucesso.',
      type: AnimadorResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiConflictResponse({ description: 'Email já está em uso.' }),
  );
}

export function ApiSigninDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login do usuário',
      description: 'Autentica o animador com e-mail e senha, retornando tokens de acesso e refresh.',
    }),
    ApiCreatedResponse({
      description: 'Autenticação realizada com sucesso.',
      type: SignInResponseDto,
    }),
    ApiUnauthorizedResponse({ description: 'Credenciais inválidas.' }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
  );
}

export function ApiRefreshTokenDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Renovar token de acesso',
      description: 'Gera um novo token de acesso e um novo refresh token a partir de um refresh token válido.',
    }),
    ApiBody({ type: RefreshTokenDto }),
    ApiCreatedResponse({
      description: 'Tokens renovados com sucesso.',
      type: RefreshTokenResponseDto,
    }),
    ApiUnauthorizedResponse({ description: 'Token de refresh expirado, revogado ou inválido.' }),
  );
}

export function ApiLogoutDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Logout do usuário',
      description: 'Revoga/deleta o refresh token do banco de dados.',
    }),
    ApiBody({ type: RefreshTokenDto }),
    ApiCreatedResponse({
      description: 'Logout realizado com sucesso.',
      type: MessageResponseDto,
    }),
  );
}

export function ApiChangePasswordDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Alterar senha do usuário',
      description: 'Altera a senha do animador autenticado.',
    }),
    ApiOkResponse({
      description: 'Senha atualizada com sucesso.',
      type: MessageResponseDto,
    }),
    ApiUnauthorizedResponse({ description: 'Senha atual incorreta, ou usuário não autenticado.' }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
  );
}

export function ApiMeDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Perfil do usuário',
      description: 'Retorna as informações de perfil do animador autenticado.',
    }),
    ApiOkResponse({
      description: 'Perfil retornado com sucesso.',
      type: AnimadorResponseDto,
    }),
    ApiUnauthorizedResponse({ description: 'Usuário não autenticado.' }),
  );
}
