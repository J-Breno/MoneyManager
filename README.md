# 💰 Money Manager

**Money Manager** é uma aplicação web moderna e intuitiva para gerenciamento financeiro pessoal. Com uma interface elegante e funcionalidades completas, ajuda usuários a controlar suas finanças, acompanhar gastos e receitas, e alcançar seus objetivos financeiros.

## ✨ Características Principais

### 🔐 Autenticação Segura
- **Registro de Usuários**: Criação de conta com validação completa
- **Login Seguro**: Autenticação com email e senha
- **Sessão Persistente**: Mantém o usuário logado entre sessões
- **Logout**: Encerramento seguro de sessão

### 📊 Dashboard Intuitivo
- **Visão Geral**: Saldo total, entradas e saídas em tempo real
- **Controle de Visibilidade**: Toggle para mostrar/ocultar valores sensíveis
- **Filtros Inteligentes**: Filtre transações por tipo (todas, entradas, saídas)
- **Busca Avançada**: Pesquisa por descrição ou categoria

### 💳 Gestão de Transações
- **CRUD Completo**: Criar, visualizar, editar e excluir transações
- **Categorização**: Organize transações em categorias personalizáveis
- **Tipos de Transação**: Entradas (receitas) e Saídas (despesas)
- **Datas Personalizáveis**: Registre transações em qualquer data

### 🎨 Design e Experiência
- **Interface Moderna**: Design limpo e profissional com tema light
- **Totalmente Responsivo**: Adaptável para desktop, tablet e mobile
- **Animações Suaves**: Transições elegantes com Framer Motion
- **Paleta de Cores Personalizada**: Cores harmoniosas seguindo design system

### 🔧 Funcionalidades Técnicas
- **Persistência Local**: Dados salvos no localStorage do navegador
- **Validação de Formulários**: Verificação em tempo real de entradas
- **Notificações Toast**: Feedback visual para ações do usuário
- **Loading States**: Indicadores de carregamento durante processos

## 🎯 Tecnologias Utilizadas

### Frontend
- **Next.js 15.5.3**: Framework React com App Router
- **React 19.1.0**: Biblioteca principal de interface
- **TypeScript**: Tipagem estática para maior confiabilidade
- **Tailwind CSS 3.4.17**: Framework CSS utilitário
- **Framer Motion 12.23.16**: Animaciones e transições
- **Lucide React 0.544.0**: Ícones modernos e consistentes

### Funcionalidades
- **React Hot Toast 2.6.0**: Notificações toast elegantes
- **Recharts 3.2.1**: Gráficos e visualizações de dados

### Desenvolvimento
- **ESLint 9**: Linting e qualidade de código
- **PostCSS 8.4.0**: Processamento de CSS
- **Autoprefixer 10.4.0**: Prefixos CSS automáticos

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes

### Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd money-manager
   ```
2. **Instale as dependências**
    ```bash
   npm install
   ```
3. **Execute em modo desenvolvimento**
```bash
    npm run dev
   ```
# 🎨 Paleta de Cores

## Cores Principais
- **Roxo Primário**: #A950C4 até #49115A (9 tons)
- **Cinzas**: #FEFBFF até #232224 (escala completa)
- **Sucesso**: #32D957 (verde)
- **Aviso**: #FFCE52 (amarelo)
- **Erro**: #EB3D3D (vermelho)

## Gradientes
- `#FCBD38 → #F7931E` (laranja)
- `#8429A0 → transparente` (roxo)
- `#82269E → transparente` (roxo escuro)

---

# 📱 Responsividade

## Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Comportamentos
- **Sidebar**: Fixo no desktop, modal no mobile
- **Navegação**: Adaptável para diferentes tamanhos de tela
- **Formulários**: Layout responsivo para melhor UX mobile

---

# 🔐 Sistema de Autenticação

## Funcionalidades
- Registro com validação de email e senha
- Login seguro com credenciais
- Persistência de sessão no localStorage
- Proteção de rotas privadas
- Logout com limpeza de sessão

## Segurança
- Validação de campos no frontend
- Mensagens de erro genéricas para segurança
- Dados de usuário isolados por sessão

---

# 💾 Persistência de Dados

## localStorage Structure
```typescript
{
  "money_manager_users": Array<User>,
  "money_manager_current_user": User,
  "money_manager_user_credentials": { [email]: password },
  "money_manager_transactions_${userId}": Array<Transaction>,
  "money_manager_categories_${userId}": Array<Category>
}
```

# 🎯 Funcionalidades do Dashboard

## Visão Geral Financeira
- Saldo total atualizado em tempo real
- Total de entradas (receitas)
- Total de saídas (despesas)
- Gráficos de distribuição (planejado)

## Gestão de Transações
- Listagem com paginação virtual
- Filtros por tipo e categoria
- Busca por texto em descrições
- Ordenação por data e valor

## Categorias Pré-definidas
- **Entradas**: Salário, Freelance, Investimentos
- **Saídas**: Alimentação, Transporte, Moradia, Saúde, Educação, Lazer

---

# 🔧 Personalização e Configuração

## Variáveis de Ambiente
O projeto pode ser configurado através de variáveis de ambiente para:
- Configurações de API
- Chaves de serviços externos
- Modo de desenvolvimento/produção

## Temas e Estilos
- Design system consistente
- Fácil customização através do Tailwind
- Componentes themáveis

---

# 📈 Próximas Funcionalidades (Roadmap)
- 💹 Gráficos e visualizações detalhadas
- 📅 Orçamentos e metas financeiras
- 🔔 Notificações e lembretes
- 📤 Exportação de relatórios (PDF/CSV)
- 🌐 Sync em nuvem entre dispositivos
- 📱 Aplicativo mobile nativo
- 💱 Suporte a múltiplas moedas
- 🏦 Integração com bancos (Open Banking)

---

# 🐛 Solução de Problemas

## Problemas Comuns
- Dados não persistem: Verifique se o localStorage está habilitado
- Login não funciona: Confirme que o usuário foi registrado primeiro
- Estilos não carregam: Execute `npm run build` seguido de `npm start`

## Debugging
Use as ferramentas de desenvolvedor para:
- Inspecionar o localStorage
- Verificar erros no console
- Analisar a rede para requisições

---

# 🤝 Contribuição
Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

# 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

# 👥 Autores
- Desenvolvedor - João Breno

---

# 🙏 Agradecimentos
- Equipe de design pela paleta de cores e componentes
- Comunidade React e Next.js pela documentação excelente
- Contribuidores de bibliotecas open source utilizadas

---

**Money Manager - Transformando a maneira como você controla suas finanças! 💪**
