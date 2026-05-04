// import { PrismaService} from '../src/prisma.service';
// import { fakerPT_BR as faker } from '@faker-js/faker';

// const prisma = new PrismaService();

// // Função para gerar CPF formatado 000.000.000-00
// const generateCPF = () => {
//   const n = () => Math.floor(Math.random() * 9);
//   return `${n()}${n()}${n()}.${n()}${n()}${n()}.${n()}${n()}${n()}-${n()}${n()}`;
// };

// // Função para gerar Telefone formatado (XX) XXXXX-XXXX
// const generatePhone = () => {
//   const ddd = Math.floor(Math.random() * 89) + 11;
//   const prefixo = 90000 + Math.floor(Math.random() * 9999);
//   const sufixo = 1000 + Math.floor(Math.random() * 8999);
//   return `(${ddd}) ${prefixo}-${sufixo}`;
// };

// async function main() {
//   console.log('🌱 Iniciando seed de Crismandos...');

//   // 1. Opcional: Limpar dados existentes (CUIDADO EM PROD)
//   // await prisma.crismando.deleteMany();

//   // 2. Criar 50 registros
//   for (let i = 0; i < 50; i++) {
//     const nome = faker.person.fullName();
    
//     await prisma.crismando.create({
//       data: {
//         nomeCrismando: nome,
//         cpf: generateCPF(),
//         idade: faker.number.int({ min: 14, max: 23 }),
//         dataNascimento: faker.date.birthdate({ min: 14, max: 23, mode: 'age' }),
//         cidadeNascimento: faker.location.city(),
//         estadoNascimento: faker.location.state({ abbreviated: true }),
//         endereco: faker.location.street(),
//         numEndereco: faker.location.buildingNumber(),
//         complemento: Math.random() > 0.5 ? 'Apt ' + faker.number.int(100) : '',
//         bairro: 'Centro',
//         cep: faker.location.zipCode('########'),
//         telefoneCrismando: generatePhone(),
//         nomePai: faker.person.fullName({ sex: 'male' }),
//         nomeMae: faker.person.fullName({ sex: 'female' }),
//         telefonePai: generatePhone(),
//         telefoneMae: generatePhone(),
//         batizado: faker.helpers.arrayElement(['Sim', 'Não']),
//         primeiraEucaristia: faker.helpers.arrayElement(['Sim', 'Não']),
//         justificativa: faker.lorem.sentence(),
//       },
//     });
//   }

//   console.log('✅ 50 crismandos criados com sucesso!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });