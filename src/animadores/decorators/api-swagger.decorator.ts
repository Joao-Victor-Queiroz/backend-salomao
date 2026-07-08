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
import { AnimadorResponseDto } from '../dto/animador-response.dto';

export function ApiCreateAnimadorDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Criar um animador',
      description: 'Cria um novo animador e o associa ao grupo padrão de animadores.',
    }),
    ApiCreatedResponse({
      description: 'Animador criado com sucesso.',
      type: AnimadorResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
  );
}

export function ApiFindAllAnimadoresDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar todos os animadores',
      description: 'Retorna a lista de todos os animadores cadastrados (sem a senha).',
    }),
    ApiOkResponse({
      description: 'Lista de animadores retornada com sucesso.',
      type: [AnimadorResponseDto],
    }),
  );
}

export function ApiFindAnimadoresSemGrupoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar animadores sem grupo de crismandos',
      description: 'Retorna a lista de animadores que ainda não estão associados a nenhum grupo de crismandos.',
    }),
    ApiOkResponse({
      description: 'Lista de animadores sem grupo retornada com sucesso.',
      type: [AnimadorResponseDto],
    }),
  );
}

export function ApiFindOneAnimadorDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar um animador por ID',
      description: 'Retorna os detalhes de um animador específico a partir do seu ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do animador',
      example: 'uuid-123-456',
    }),
    ApiOkResponse({
      description: 'Animador encontrado com sucesso.',
      type: AnimadorResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Animador não encontrado.' }),
  );
}

export function ApiUpdateAnimadorDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar um animador por ID',
      description: 'Atualiza os dados de um animador específico. Apenas o próprio animador ou um COORDENADOR_GERAL podem realizar esta ação.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do animador',
      example: 'uuid-123-456',
    }),
    ApiOkResponse({
      description: 'Animador atualizado com sucesso.',
      type: AnimadorResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Animador não encontrado.' }),
  );
}

export function ApiRemoveAnimadorDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover um animador por ID',
      description: 'Exclui um animador do sistema. Apenas o próprio animador ou um COORDENADOR_GERAL podem realizar esta ação.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do animador',
      example: 'uuid-123-456',
    }),
    ApiOkResponse({
      description: 'Animador removido com sucesso.',
      type: AnimadorResponseDto,
    }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Animador não encontrado.' }),
  );
}
