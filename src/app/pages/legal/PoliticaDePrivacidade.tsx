import LegalPageLayout, { LegalHeading, LegalList, LegalParagraph } from "@/app/components/LegalPageLayout";

// Texto padrão de mercado, adaptado à LGPD — serve como ponto de partida,
// mas precisa ser revisado por um advogado antes de valer como documento
// oficial (prazos de retenção, encarregado de dados, processadores
// terceiros específicos etc. dependem de decisões internas da empresa).
export default function PoliticaDePrivacidade() {
  return (
    <LegalPageLayout title="Política de Privacidade" updated="agosto de 2026">
      <LegalParagraph>
        A Orion Chocolates ("Orion", "nós") respeita a sua privacidade e está comprometida em
        proteger os dados pessoais dos usuários deste site, em conformidade com a Lei Geral de
        Proteção de Dados (Lei nº 13.709/2018 — LGPD). Esta política explica quais dados
        coletamos, como os utilizamos e quais são os seus direitos.
      </LegalParagraph>

      <LegalHeading>1. Quais dados coletamos</LegalHeading>
      <LegalParagraph>
        Podemos coletar os seguintes tipos de dados quando você navega ou interage com o site:
      </LegalParagraph>
      <LegalList>
        <li>Dados de contato fornecidos voluntariamente (nome, e-mail, telefone e mensagem) ao preencher formulários, como o de contato ou o de envio de currículo;</li>
        <li>Dados de navegação (endereço IP, tipo de navegador, páginas visitadas e tempo de acesso), coletados automaticamente através de cookies e tecnologias semelhantes;</li>
      </LegalList>

      <LegalHeading>2. Como usamos os dados</LegalHeading>
      <LegalParagraph>Os dados coletados são utilizados para:</LegalParagraph>
      <LegalList>
        <li>Responder a dúvidas, solicitações e mensagens enviadas pelos formulários do site;</li>
        <li>Avaliar candidaturas recebidas pela página "Trabalhe conosco";</li>
        <li>Melhorar a experiência de navegação e o conteúdo do site;</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </LegalList>

      <LegalHeading>3. Compartilhamento de dados</LegalHeading>
      <LegalParagraph>
        A Orion não vende nem aluga dados pessoais a terceiros. Os dados podem ser compartilhados
        apenas com prestadores de serviço que atuam em nosso nome (como provedores de hospedagem e
        ferramentas de e-mail), sempre sob obrigação de confidencialidade, ou quando exigido por
        lei ou ordem judicial.
      </LegalParagraph>

      <LegalHeading>4. Seus direitos</LegalHeading>
      <LegalParagraph>Nos termos da LGPD, você tem o direito de:</LegalParagraph>
      <LegalList>
        <li>Confirmar a existência de tratamento de seus dados;</li>
        <li>Acessar, corrigir ou atualizar seus dados;</li>
        <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;</li>
        <li>Revogar o consentimento e solicitar a exclusão dos dados fornecidos.</li>
      </LegalList>
      <LegalParagraph>
        Para exercer esses direitos, entre em contato pelo e-mail{" "}
        <a href="mailto:contato@orionchocolates.com.br" className="text-[#e29647] underline">
          contato@orionchocolates.com.br
        </a>
        .
      </LegalParagraph>

      <LegalHeading>5. Segurança dos dados</LegalHeading>
      <LegalParagraph>
        Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados pessoais
        contra acesso não autorizado, perda, alteração ou divulgação indevida.
      </LegalParagraph>

      <LegalHeading>6. Alterações nesta política</LegalHeading>
      <LegalParagraph>
        Esta política pode ser atualizada periodicamente. A data da última atualização está
        indicada no topo desta página.
      </LegalParagraph>

      <LegalHeading>7. Contato</LegalHeading>
      <LegalParagraph>
        Dúvidas sobre esta Política de Privacidade podem ser enviadas para{" "}
        <a href="mailto:contato@orionchocolates.com.br" className="text-[#e29647] underline">
          contato@orionchocolates.com.br
        </a>
        .
      </LegalParagraph>
    </LegalPageLayout>
  );
}
