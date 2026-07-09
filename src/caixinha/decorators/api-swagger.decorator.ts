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
import { CaixinhaResponseDto } from '../dto/caixinha-response.dto';

export function ApiCreateCaixinhaDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registrar um pagamento de caixinha',
      description: 'Registra um novo valor pago por um crismando.',
    }),
    ApiCreatedResponse({
      description: 'Pagamento registrado com sucesso.',
      type: CaixinhaResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
  );
}

export function ApiFindOneCaixinhaDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Buscar registro de caixinha por ID',
      description: 'Retorna os detalhes de um pagamento de caixinha específico a partir do seu ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do registro de caixinha',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Registro de caixinha encontrado com sucesso.',
      type: CaixinhaResponseDto,
    }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Registro de caixinha não encontrado.' }),
  );
}

export function ApiUpdateCaixinhaDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualizar registro de caixinha por ID',
      description: 'Atualiza as informações de um pagamento de caixinha específico.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do registro de caixinha',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Registro de caixinha atualizado com sucesso.',
      type: CaixinhaResponseDto,
    }),
    ApiBadRequestResponse({ description: 'Dados de entrada inválidos.' }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Registro de caixinha não encontrado.' }),
  );
}

export function ApiRemoveCaixinhaDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: 'Remover registro de caixinha por ID',
      description: 'Exclui permanentemente um registro de pagamento de caixinha.',
    }),
    ApiParam({
      name: 'id',
      description: 'ID único do registro de caixinha',
      example: 'd3b07384-d113-4ec5-a5e2-9e8c45963283',
    }),
    ApiOkResponse({
      description: 'Registro de caixinha removido com sucesso.',
      type: CaixinhaResponseDto,
    }),
    ApiForbiddenResponse({ description: 'Acesso negado para esta operação.' }),
    ApiNotFoundResponse({ description: 'Registro de caixinha não encontrado.' }),
  );
}
