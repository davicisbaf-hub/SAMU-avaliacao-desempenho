'use client';

import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import { ChevronDown, Search, Globe, MessageCircleMore, HelpCircle } from 'lucide-react';

const faqData = [
  {
  category: 'Acesso e Autenticação',
  items: [
    {
      question: 'Como entro em contato com o suporte?',
      answer: 'Para solicitar suporte, entre em contato pelo telefone (21) 97314-7367 ou acesse o sistema de chamados em chamadosti.cisbaf.org.br. Nossa equipe está disponível de segunda a sexta-feira, das 9h às 17h, para auxiliar nas solicitações.'
    },
    {
      question: 'Como redefinir minha senha?',
      answer: 'A redefinição de senha deve ser realizada por usuários com perfil de Coordenador ou Administrador. Acesse a página de Cadastro, localize o usuário desejado e selecione a opção "Redefinir senha". Após a alteração, o acesso poderá ser realizado utilizando o CPF e a senha padrão no formato "Cisbaf@AnoAtual". Exemplo: Cisbaf@2026.'
    },
    {
      question: 'Posso acessar o sistema pelo celular?',
      answer: 'Sim. O sistema possui design responsivo e está preparado para funcionar em smartphones, tablets e computadores, proporcionando uma melhor experiência de acesso em diferentes dispositivos.'
    }
  ]
},
{
  category: 'Avaliações',
  items: [
    {
      question: 'Quem pode acessar o sistema?',
      answer: 'O acesso é restrito aos profissionais autorizados do SAMU 192 que possuem credenciais válidas cadastradas no sistema.'
    },
    {
      question: 'Como visualizar minhas avaliações?',
      answer: 'A visualização das avaliações é realizada pelos responsáveis autorizados, como coordenadores de base. No menu lateral, acesse a opção "Baixar Fichas" para consultar e gerar os documentos disponíveis.'
    },
    {
      question: 'Como baixar as fichas de avaliação?',
      answer: 'No menu lateral, selecione a opção "Baixar Fichas" para acessar e realizar o download das avaliações disponíveis em formato PDF.'
    },
    {
      question: 'Posso editar uma avaliação após o envio?',
      answer: 'Não. Após o envio, a avaliação é bloqueada para edição, garantindo a integridade, rastreabilidade e confiabilidade das informações registradas.'
    },
    {
      question: 'Como funciona a avaliação 360°?',
      answer: 'A avaliação 360° permite uma análise completa do desempenho profissional, podendo envolver autoavaliação, avaliação da liderança e contribuições da equipe, proporcionando uma visão ampla das competências avaliadas.'
    }
  ]
},
{
  category: 'Dados e Privacidade',
  items: [
    {
      question: 'Quem pode visualizar minhas avaliações?',
      answer: 'O acesso às avaliações é controlado conforme o perfil de permissão do usuário. Gestores e responsáveis autorizados possuem acesso às informações necessárias para acompanhamento e desenvolvimento profissional.'
    },
    {
      question: 'Minha avaliação é anônima?',
      answer: 'Sim. Quando aplicável, as avaliações realizadas por terceiros preservam a identidade do avaliador, garantindo maior segurança e transparência no processo. A identificação ocorre apenas quando o usuário realiza uma autoavaliação.'
    },
    {
      question: 'O sistema é seguro?',
      answer: 'Sim. O sistema utiliza mecanismos de segurança, controle de acesso por perfil e boas práticas de proteção de dados, seguindo os princípios estabelecidos pela Lei Geral de Proteção de Dados (LGPD).'
    }
  ]
},
{
  category: 'Desenvolvimento e KPIs',
  items: [
    {
      question: 'O que é o Plano de Desenvolvimento Individual (PDI)?',
      answer: 'O Plano de Desenvolvimento Individual (PDI) é uma ferramenta que organiza ações e metas personalizadas para aprimorar competências, desenvolver habilidades e contribuir para o crescimento profissional.'
    },
    {
      question: 'Como acessar o painel de KPIs?',
      answer: 'No menu lateral, selecione a opção "Painel de KPIs" para visualizar indicadores, métricas de desempenho e informações estratégicas relacionadas às avaliações realizadas.'
    },
    {
      question: 'Como funciona a pontuação das avaliações?',
      answer: 'A pontuação é calculada com base nos critérios de avaliação e competências definidos para cada função, permitindo uma análise objetiva do desempenho profissional.'
    }
  ]
},
{
  category: 'Geral',
  items: [
    {
      question: 'Como reportar um erro no sistema?',
      answer: 'Para comunicar um erro, envie uma descrição detalhada do problema, incluindo capturas de tela quando possível, através do sistema de chamados em chamadosti.cisbaf.org.br.'
    },
    {
      question: 'Como sugerir melhorias?',
      answer: 'Sugestões e melhorias podem ser enviadas através do sistema de chamados em chamadosti.cisbaf.org.br. A participação dos usuários contribui para a evolução contínua da plataforma.'
    },
    {
      question: 'O que fazer em caso de dúvidas?',
      answer: 'Consulte esta central de ajuda ou entre em contato com o suporte através do sistema de chamados em chamadosti.cisbaf.org.br ou pelo telefone (21) 97314-7367.'
    }
  ]
}]

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#e0e6eb] rounded-lg overflow-hidden transition-all hover:border-[#cd0048]/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between bg-white hover:bg-[#f5f8fb] transition-colors text-left"
      >
        <span className="font-medium text-[#1a1a1a]">{question}</span>
        <ChevronDown
          size={20}
          className={`text-[#cd0048] flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-5 py-4 bg-[#f9fbfd] border-t border-[#e0e6eb]">
          <p className="text-[#555f69] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQCategory({ category, items, searchTerm }) {
  const filteredItems = useMemo(() => {
    return items.filter(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  if (filteredItems.length === 0) return null;

  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-[#cd0048] rounded-full" />
        {category}
      </h3>
      <div className="space-y-3 ml-0">
        {filteredItems.map((item, idx) => (
          <FAQItem key={idx} question={item.question} answer={item.answer} />
        ))}
      </div>
    </div>
  );
}

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');

  const hasResults = faqData.some(category =>
    category.items.some(
      item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen w-screen bg-white text-black">
      <Nav />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <div className="custom-scrollbar p-8 overflow-y-auto text-left">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-[#cd0048]/10 rounded-lg">
                <HelpCircle size={24} className="text-[#cd0048]" />
              </div>
              <h1 className="text-3xl font-bold text-[#1a1a1a]">Ajuda e Suporte</h1>
            </div>
            <p className="text-[#555f69] ml-11">
              Encontre respostas para dúvidas comuns ou entre em contato conosco
            </p>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-gradient-to-br from-[#cd0048]/5 to-[#cd0048]/10 rounded-xl p-6 border border-[#cd0048]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#cd0048]/20 rounded-lg">
                  <Globe size={20} className="text-[#cd0048]" />
                </div>
                <h2 className="font-semibold text-[#1a1a1a]">Suporte</h2>
              </div>
              <a
                href="https://chamadosti.cisbaf.org.br/"
                target="_blank"
                className="text-[#cd0048] hover:text-[#a50038] transition-colors font-medium"
              >
                chamadosti.cisbaf.org.br
              </a>
            </div>

            <div className="bg-gradient-to-br from-[#cd0048]/5 to-[#cd0048]/10 rounded-xl p-6 border border-[#cd0048]/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[#cd0048]/20 rounded-lg">
                  <MessageCircleMore size={20} className="text-[#cd0048]" />
                </div>
                <h2 className="font-semibold text-[#1a1a1a]">WhatsApp</h2>
              </div>
              <a
                href="https://api.whatsapp.com/send/?phone=5521973147367&text&type=phone_number&app_absent=0"
                target="_blank"
                className="text-[#cd0048] hover:text-[#a50038] transition-colors font-medium"
              >
                (21) 97314-7367
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-10">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]" />
              <input
                type="text"
                placeholder="Pesquise por palavras-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#e0e6eb] rounded-lg focus:outline-none focus:border-[#cd0048] focus:ring-2 focus:ring-[#cd0048]/10 transition-all"
              />
            </div>
          </div>

          {/* FAQ Sections */}
          <div>
            {hasResults ? (
              <>
                {searchTerm && (
                  <p className="text-sm text-[#999] mb-6">
                    {faqData.reduce(
                      (count, cat) =>
                        count +
                        cat.items.filter(
                          item =>
                            item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.answer.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length,
                      0
                    )}{' '}
                    resultado(s) encontrado(s)
                  </p>
                )}
                {faqData.map((category) => (
                  <FAQCategory
                    key={category.category}
                    category={category.category}
                    items={category.items}
                    searchTerm={searchTerm}
                  />
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mb-4 text-[#cd0048]/30">
                  <Search size={48} className="mx-auto mb-2" />
                </div>
                <p className="text-[#555f69] font-medium">Nenhum resultado encontrado</p>
                <p className="text-[#999] text-sm mt-1">
                  Tente uma busca diferente ou entre em contato com o suporte
                </p>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          {!searchTerm && (
            <div className="mt-12 pt-8 border-t border-[#e0e6eb]">
              <div className="bg-[#f5f8fb] rounded-xl p-6 text-center">
                <p className="text-[#555f69] mb-4">
                  Não encontrou o que procura?
                </p>
                <a
                  href="https://api.whatsapp.com/send/?phone=5521973147367&text&type=phone_number&app_absent=0"
                  target="_blank"
                  className="inline-block px-6 py-3 bg-[#cd0048] text-white rounded-lg font-medium hover:bg-[#a50038] transition-colors"
                >
                  Entrar em Contato com Suporte
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}