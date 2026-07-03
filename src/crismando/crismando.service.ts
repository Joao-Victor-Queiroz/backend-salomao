import { Injectable } from '@nestjs/common';
import { CreateCrismandoDto } from './dto/create-crismando.dto';
import { UpdateCrismandoDto } from './dto/update-crismando.dto';
import { PrismaService } from 'src/prisma.service';


@Injectable()
export class CrismandoService {
  constructor(private prisma: PrismaService) {}

  createCrismando(createCrismandoDto: CreateCrismandoDto) {
    return this.prisma.crismando.create({
      data: createCrismandoDto,
    });
  }

  async findAllCrismandos() {
    const crismandos = await this.prisma.crismando.findMany({
      select: {
        id: true,
        nomeCrismando: true,
        idade: true,
        dataNascimento: true,
        ativo: true,
        batizado: true,
        primeiraEucaristia: true,
        grupo: {
          select: {
            nomeGrupo: true,
          },
        },
      },
      orderBy: {
        nomeCrismando: 'asc',
      }
    });

    console.log('Crismandos retornados: ', crismandos)


    return crismandos.map((crismando) => ({
      id: crismando.id,
      nomeCrismando: crismando.nomeCrismando,
      idade: crismando.idade,
      dataNascimento: crismando.dataNascimento,
      ativo: crismando.ativo,
      nomeGrupo: crismando.grupo?.nomeGrupo || 'Sem Grupo',
      batizado: crismando.batizado,
      primeiraEucaristia: crismando.primeiraEucaristia,
    }));
  }

  findCrismandosSemGrupo() {
    return this.prisma.crismando.findMany({
      where: { grupoId: null },
      orderBy:{
        idade: 'asc',
      }
    });
  }

  findOneCrismando(id: string) {
    return this.prisma.crismando.findUnique({
      where: { id: id },
      include: {
        grupo: {
          select: {
            nomeGrupo: true,
          },
        },
        frequencias: true,
        caixinhas: true,
      },
    });
  }

  updateCrismando(idCrismando: string, updateCrismandoDto: UpdateCrismandoDto) {
    // const crismando = await this.prisma.crismando.findUnique({
    //   where: { id: idCrismando },
    // });

    // if (!crismando) {
    //   throw new NotFoundException('Crismando não encontrado.');
    // }

    // const userHasRoles =
    //   user.cargo === Cargo.COORDENADOR_GERAL ||
    //   user.cargo === Cargo.COORDENADOR_FREQUENCIA;
    // const userGroup = user.grupoId;

    // if (!userHasRoles && crismando.grupoId !== userGroup) {
    //   throw new ForbiddenException(
    //     'Você não tem permissãoo para editar este crismando',
    //   );
    // }

    return this.prisma.crismando.update({
      data: updateCrismandoDto,
      where: { id: idCrismando },
    });
  }

  removeCrismando(idCrismando: string) {
    // const crismando = await this.prisma.crismando.findUnique({
    //   where: { id: idCrismando },
    // });

    // if (!crismando) {
    //   throw new NotFoundException('Crismando não encontrado.');
    // }

    // if (!this.canAccess(crismando.grupoId!, user)) {
    //   throw new ForbiddenException(
    //     'Você não tem permissão para excluir este crismando.',
    //   );
    // }

    return this.prisma.crismando.delete({
      where: { id: idCrismando },
    });
  }

  // private canAccess(targetId: string, user: Payload): boolean {
  //   const hasUserSameGroupId = user.grupoId === targetId;
  //   const hasRequiredRole = (
  //     [Cargo.COORDENADOR_GERAL, Cargo.COORDENADOR_FREQUENCIA] as Cargo[]
  //   ).includes(user.cargo);

  //   return hasUserSameGroupId || hasRequiredRole;
  // }
}
