import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { SignInResponseDto } from '../dto/sign-in-response.dto';
import { RefreshTokenResponseDto } from '../dto/refresh-token-response.dto';
import { MessageResponseDto } from '../dto/message-response.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AssociarAnimadorDto } from '../dto/associar-animador.dto';

export function ApiSignupDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cadastro de usuário',
      description: 'Realiza o cadastro de um novo usuário no sistema.',
    }),
    ApiCreatedResponse({
      description: 'Usuário cadastrado com sucesso.',
      type: UserResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiConflictResponse({ description: 'Email já está em uso.' }),
  );
}

export function ApiSigninDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login do usuário',
      description: 'Autentica o usuário com e-mail e senha, retornando tokens de acesso e refresh.',
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
      description: 'Altera a senha do usuário autenticado.',
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
      description: 'Retorna as informações de perfil do usuário autenticado.',
    }),
    ApiOkResponse({
      description: 'Perfil retornado com sucesso.',
      type: UserResponseDto,
    }),
    ApiUnauthorizedResponse({ description: 'Usuário não autenticado.' }),
  );
}

export function ApiFindAllUsersDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Listar usuários',
      description: 'Retorna a lista de todos os usuários cadastrados sem a senha. Acesso restrito a ADMIN e COORDENADOR_GERAL.',
    }),
    ApiOkResponse({
      description: 'Lista de usuários retornada com sucesso.',
      type: [UserResponseDto],
    }),
    ApiUnauthorizedResponse({ description: 'Usuário não autenticado.' }),
    ApiForbiddenResponse({ description: 'Acesso negado. Cargo insuficiente.' }),
  );
}

export function ApiUpdateUserDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Editar usuário',
      description: 'Atualiza os dados de um usuário pelo ID. Acesso restrito a ADMIN e COORDENADOR_GERAL.',
    }),
    ApiBody({ type: UpdateUserDto }),
    ApiOkResponse({
      description: 'Usuário atualizado com sucesso.',
      type: UserResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiUnauthorizedResponse({ description: 'Usuário não autenticado.' }),
    ApiForbiddenResponse({ description: 'Acesso negado. Cargo insuficiente.' }),
    ApiNotFoundResponse({ description: 'Usuário não encontrado.' }),
    ApiConflictResponse({ description: 'Email já está em uso por outro usuário.' }),
  );
}

export function ApiAssociarAnimadorDecorator() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Associar animador ao usuário',
      description:
        'Associa (ou desassocia se passar null) um usuário a um animador existente. Acesso restrito a ADMIN e COORDENADOR_GERAL.',
    }),
    ApiBody({ type: AssociarAnimadorDto }),
    ApiOkResponse({
      description: 'Usuário associado ao animador com sucesso.',
      type: UserResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiUnauthorizedResponse({ description: 'Usuário não autenticado.' }),
    ApiForbiddenResponse({ description: 'Acesso negado. Cargo insuficiente.' }),
    ApiNotFoundResponse({ description: 'Usuário ou animador não encontrado.' }),
    ApiConflictResponse({ description: 'O animador informado já está associado a outro usuário.' }),
  );
}


