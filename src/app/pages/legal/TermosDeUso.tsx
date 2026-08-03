import LegalPageLayout, { LegalHeading, LegalParagraph } from "@/app/components/LegalPageLayout";

// Texto padrão de mercado — precisa ser revisado por um advogado antes de
// valer como documento oficial (especialmente a cláusula de foro e
// eventuais termos de compra/venda, caso o site passe a vender online).
export default function TermosDeUso() {
  return (
    <LegalPageLayout title="Termos de Uso" updated="agosto de 2026">
      <LegalParagraph>
        Estes Termos de Uso regulam o acesso e a utilização do site da Orion Chocolates. Ao
        acessar este site, você concorda com os termos descritos abaixo.
      </LegalParagraph>

      <LegalHeading>1. Aceitação dos termos</LegalHeading>
      <LegalParagraph>
        Ao utilizar este site, você declara ter lido, compreendido e aceito integralmente estes
        Termos de Uso. Caso não concorde com algum ponto, recomendamos que não utilize o site.
      </LegalParagraph>

      <LegalHeading>2. Uso do site</LegalHeading>
      <LegalParagraph>
        O conteúdo deste site tem finalidade institucional e informativa, apresentando a marca
        Orion Chocolates, seus produtos e canais de contato. É vedado o uso do site para fins
        ilícitos ou que possam prejudicar seu funcionamento, segurança ou disponibilidade para
        outros usuários.
      </LegalParagraph>

      <LegalHeading>3. Propriedade intelectual</LegalHeading>
      <LegalParagraph>
        Todo o conteúdo deste site — incluindo textos, imagens, logotipos, marcas e elementos
        visuais — é de propriedade da Orion Chocolates ou usado sob licença, sendo protegido pela
        legislação de propriedade intelectual. É proibida a reprodução, distribuição ou uso
        comercial sem autorização prévia por escrito.
      </LegalParagraph>

      <LegalHeading>4. Limitação de responsabilidade</LegalHeading>
      <LegalParagraph>
        Envidamos esforços para manter as informações deste site precisas e atualizadas, mas não
        garantimos a ausência de erros ou interrupções. A Orion não se responsabiliza por danos
        decorrentes do uso ou da impossibilidade de uso do site.
      </LegalParagraph>

      <LegalHeading>5. Links para sites de terceiros</LegalHeading>
      <LegalParagraph>
        Este site pode conter links para sites de terceiros (como redes sociais ou serviços de
        mapas). A Orion não se responsabiliza pelo conteúdo ou pelas práticas de privacidade
        desses sites externos.
      </LegalParagraph>

      <LegalHeading>6. Alterações nestes termos</LegalHeading>
      <LegalParagraph>
        Estes Termos de Uso podem ser atualizados periodicamente, sem aviso prévio. A data da
        última atualização está indicada no topo desta página.
      </LegalParagraph>

      <LegalHeading>7. Lei aplicável e foro</LegalHeading>
      <LegalParagraph>
        Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Fica eleito
        o foro da comarca de Blumenau, Santa Catarina, para dirimir quaisquer controvérsias
        decorrentes destes termos.
      </LegalParagraph>

      <LegalHeading>8. Contato</LegalHeading>
      <LegalParagraph>
        Dúvidas sobre estes Termos de Uso podem ser enviadas para{" "}
        <a href="mailto:contato@orionchocolates.com.br" className="text-[#e29647] underline">
          contato@orionchocolates.com.br
        </a>
        .
      </LegalParagraph>
    </LegalPageLayout>
  );
}
