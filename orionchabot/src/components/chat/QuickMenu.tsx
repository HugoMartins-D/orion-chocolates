// Atalhos do menu inicial (P13). Cada botão envia o número como mensagem do
// usuário — o agente trata o texto normalmente.
export default function QuickMenu({ onEscolher, desativado }: { onEscolher: (texto: string) => void; desativado: boolean }) {
  const opcoes = [
    { label: "1 – Produtos", texto: "Quero ver os produtos" },
    { label: "2 – Contatos", texto: "Quais são os contatos da Orion?" },
    { label: "3 – Endereços", texto: "Onde ficam as lojas?" },
    { label: "4 – Pedidos", texto: "Como faço pedidos?" },
  ];
  return (
    <div className="flex flex-wrap gap-2 px-4 pb-3">
      {opcoes.map((o) => (
        <button
          key={o.label}
          type="button"
          disabled={desativado}
          onClick={() => onEscolher(o.texto)}
          className="rounded-full border border-[#e29647]/60 bg-[#fdf1e3] px-3 py-1 text-xs font-medium text-[#532118] hover:bg-[#f7e2c7] disabled:opacity-50"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
