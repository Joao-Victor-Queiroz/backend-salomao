import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiParam,
} from '@nestjs/swagger';
import { CrismandoEntity } from '../entities/crismando.entity';
import { CrismandosListResponseDto, CrismandosSemGrupoDto } from '../dto/responses/crismandos-list.dto';

export function ApiCreateCrismandoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registrar um novo crismando',
      description: 'Cria um novo crismando no sistema com todas as informações necessárias.',
    }),
    ApiCreatedResponse({
      description: 'Crismando registrado com sucesso.',
      type: CrismandoEntity,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
  );
}

export function ApiFindAllCrismandosDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar todos os crismandos',
      description: 'Retorna a lista resumida de todos os crismandos cadastrados.',
    }),
    ApiOkResponse({
      description: 'Lista de crismandos retornada com sucesso.',
      type: [CrismandosListResponseDto],
    }),
  );
}

export function ApiFindCrismandosSemGrupoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar crismandos sem grupo',
      description: 'Retorna a lista de crismandos que ainda não estão associados a nenhum grupo.',
    }),
    ApiOkResponse({
      description: 'Lista de crismandos sem grupo retornada com sucesso.',
      type: [CrismandosSemGrupoDto],
    }),
  );
}

export function ApiFindOneCrismandoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar crismando por ID',
      description: 'Retorna os detalhes completos de um crismando específico (incluindo grupo, frequências e caixinhas) a partir do seu ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do crismando',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Crismando encontrado com sucesso.',
      type: CrismandoEntity,
    }),
    ApiNotFoundResponse({ description: 'Crismando não encontrado.' }),
  );
}

export function ApiUpdateCrismandoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar crismando por ID',
      description: 'Atualiza as informações de um crismando específico. Operação permitida para coordenadores e formadores.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do crismando',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Crismando atualizado com sucesso.',
      type: CrismandoEntity,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Crismando não encontrado.' }),
  );
}

export function ApiRemoveCrismandoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover crismando por ID',
      description: 'Exclui permanentemente um crismando do sistema. Operação permitida para coordenadores.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do crismando',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Crismando removido com sucesso.',
      type: CrismandoEntity,
    }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Crismando não encontrado.' }),
  );
}
