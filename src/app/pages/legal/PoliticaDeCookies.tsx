import LegalPageLayout, { LegalHeading, LegalList, LegalParagraph } from "@/app/components/LegalPageLayout";

// Texto padrão de mercado — precisa ser revisado por um advogado e ajustado
// caso o site passe a usar ferramentas de analytics/marketing que gravem
// cookies de terceiros (hoje o site não usa nenhuma).
export default function PoliticaDeCookies() {
  return (
    <LegalPageLayout title="Política de Cookies" updated="agosto de 2026">
      <LegalParagraph>
        Esta política explica o que são cookies, como a Orion Chocolates os utiliza neste site e
        quais opções você tem em relação a eles.
      </LegalParagraph>

      <LegalHeading>1. O que são cookies</LegalHeading>
      <LegalParagraph>
        Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um
        site. Eles permitem que o site reconheça seu dispositivo e lembre de informações sobre sua
        visita, como preferências de navegação.
      </LegalParagraph>

      <LegalHeading>2. Como usamos cookies</LegalHeading>
      <LegalParagraph>
        Utilizamos cookies para garantir o funcionamento adequado do site e para entender melhor
        como os visitantes interagem com nosso conteúdo, permitindo melhorias contínuas na
        experiência de navegação.
      </LegalParagraph>

      <LegalHeading>3. Tipos de cookies que utilizamos</LegalHeading>
      <LegalList>
        <li><strong>Essenciais</strong> — necessários para o funcionamento básico do site (como navegação entre páginas);</li>
        <li><strong>Desempenho</strong> — ajudam a entender como os visitantes usam o site, para que possamos melhorá-lo;</li>
        <li><strong>Funcionalidade</strong> — permitem lembrar escolhas feitas durante a navegação.</li>
      </LegalList>

      <LegalHeading>4. Como gerenciar cookies</LegalHeading>
      <LegalParagraph>
        A maioria dos navegadores permite controlar cookies através das configurações de
        privacidade — é possível bloquear ou excluir cookies já armazenados. Note que desativar
        certos cookies pode afetar o funcionamento de algumas partes do site.
      </LegalParagraph>

      <LegalHeading>5. Alterações nesta política</LegalHeading>
      <LegalParagraph>
        Esta política pode ser atualizada periodicamente. A data da última atualização está
        indicada no topo desta página.
      </LegalParagraph>

      <LegalHeading>6. Contato</LegalHeading>
      <LegalParagraph>
        Dúvidas sobre esta Política de Cookies podem ser enviadas para{" "}
        <a href="mailto:contato@orionchocolates.com.br" className="text-[#e29647] underline">
          contato@orionchocolates.com.br
        </a>
        .
      </LegalParagraph>
    </LegalPageLayout>
  );
}
