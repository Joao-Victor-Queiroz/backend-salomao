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
import { Frequencia } from '../entities/frequencia.entity';
import { BatchPayloadDto } from '../dto/batch-payload.dto';

export function ApiRegisterFrequenciaDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registrar frequência em massa para crismandos',
      description: 'Registra a frequência (presença/falta/justificativa) de vários crismandos para uma determinada data.',
    }),
    ApiCreatedResponse({
      description: 'Frequências registradas com sucesso.',
      type: BatchPayloadDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
  );
}

export function ApiRegisterFrequenciaAnimadorDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registrar frequência em massa para animadores',
      description: 'Registra a frequência de vários animadores para uma determinada data.',
    }),
    ApiCreatedResponse({
      description: 'Frequências dos animadores registradas com sucesso.',
      type: BatchPayloadDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
  );
}

export function ApiFindOneFrequenciaDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar um registro de frequência por ID',
      description: 'Retorna os detalhes de uma frequência específica a partir de seu ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do registro de frequência',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Registro de frequência encontrado com sucesso.',
      type: Frequencia,
    }),
    ApiNotFoundResponse({ description: 'Registro de frequência não encontrado.' }),
  );
}

export function ApiFindFrequenciaFromUniqueCrismandoDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar frequências de um crismando por ID do crismando',
      description: 'Retorna toda a lista de presenças/faltas associada a um crismando específico.',
    }),
    ApiParam({
      name: 'idCrismando',
      description: 'ID do crismando',
      example: 'a1b07384-b113-4ec5-c5e2-9e8c45963212',
    }),
    ApiOkResponse({
      description: 'Frequências do crismando retornadas com sucesso.',
      type: [Frequencia],
    }),
  );
}

export function ApiUpdateFrequenciaDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar registro de frequência por ID',
      description: 'Atualiza o status ou justificativa de um registro de frequência específico.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do registro de frequência',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Registro de frequência atualizado com sucesso.',
      type: Frequencia,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Registro de frequência não encontrado.' }),
  );
}

export function ApiRemoveFrequenciaDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover registro de frequência por ID',
      description: 'Exclui permanentemente um registro de frequência.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do registro de frequência',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Registro de frequência removido com sucesso.',
      type: Frequencia,
    }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Registro de frequência não encontrado.' }),
  );
}
