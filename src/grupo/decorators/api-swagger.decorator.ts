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
import {
  GrupoResponseDto,
  UniqueGrupoResponseDto,
  GrupoAnimadoresFrequenciaResponseDto,
} from '../dto/grupo-response.dto';

export function ApiCreateGrupoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Criar um novo grupo de crisma',
      description: 'Cria um novo grupo de crisma no sistema.',
    }),
    ApiCreatedResponse({
      description: 'Grupo criado com sucesso.',
      type: UniqueGrupoResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
  );
}

export function ApiFindAllGruposDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Listar todos os grupos',
      description: 'Retorna a lista de todos os grupos de crisma cadastrados.',
    }),
    ApiOkResponse({
      description: 'Lista de grupos retornada com sucesso.',
      type: [UniqueGrupoResponseDto],
    }),
  );
}

export function ApiFindGrupoAnimadoresFrequenciaDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar o grupo de animadores de frequência',
      description: 'Retorna os detalhes do grupo e a lista de animadores que respondem pela frequência.',
    }),
    ApiOkResponse({
      description: 'Grupo de animadores retornado com sucesso.',
      type: GrupoAnimadoresFrequenciaResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Grupo de animadores não configurado ou não encontrado.' }),
  );
}

export function ApiFindOneGrupoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar grupo por ID',
      description: 'Retorna os detalhes de um grupo específico, incluindo seus crismandos e animadores.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do grupo',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Grupo encontrado com sucesso.',
      type: GrupoResponseDto,
    }),
    ApiNotFoundResponse({ description: 'Grupo não encontrado.' }),
  );
}

export function ApiAddCrismandosDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Adicionar crismandos ao grupo',
      description: 'Associa uma lista de crismandos a um grupo específico.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do grupo',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Crismandos adicionados com sucesso ao grupo.',
      type: UniqueGrupoResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Um ou mais crismandos já possuem grupo ou dados inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Grupo não encontrado.' }),
  );
}

export function ApiAddAnimadoresDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Adicionar animadores ao grupo',
      description: 'Associa uma lista de animadores do ministério a um grupo específico.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do grupo',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Animadores adicionados com sucesso ao grupo.',
      type: UniqueGrupoResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Um ou mais animadores já possuem grupo ou dados inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Grupo não encontrado.' }),
  );
}

export function ApiRemoverCrismandoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover crismando do grupo',
      description: 'Desassocia um crismando específico de seu grupo.',
    }),
    ApiParam({
      name: 'idGrupo',
      description: 'ID do grupo',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiParam({
      name: 'idCrismando',
      description: 'ID do crismando',
      example: 'a1b07384-b113-4ec5-c5e2-9e8c45963212',
    }),
    ApiOkResponse({
      description: 'Crismando removido do grupo com sucesso.',
      type: UniqueGrupoResponseDto,
    }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Grupo ou Crismando não encontrado.' }),
  );
}

export function ApiUpdateGrupoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar informações do grupo',
      description: 'Altera dados como o nome do grupo.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do grupo',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Grupo atualizado com sucesso.',
      type: UniqueGrupoResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Grupo não encontrado.' }),
  );
}

export function ApiRemoveGrupoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover grupo por ID',
      description: 'Exclui permanentemente um grupo do sistema.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID do grupo',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Grupo removido com sucesso.',
      type: UniqueGrupoResponseDto,
    }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Grupo não encontrado.' }),
  );
}
