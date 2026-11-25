// Botão que abre o wa.me em nova aba. Mensagem pré-preenchida é montada no backend.
export default function WhatsappButton({ url, label }: { url: string; label: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.5 3.5A11 11 0 0 0 3.6 17.4L2 22l4.7-1.5A11 11 0 1 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.8.9.9-2.7-.2-.3A9 9 0 1 1 12 20.5Zm5.1-6.7c-.3-.1-1.7-.8-2-.9s-.5-.2-.7.2-.8.9-1 1.1-.4.2-.7 0a7 7 0 0 1-3.5-3.1c-.2-.4 0-.6.2-.8l.6-.6c.1-.2.2-.3.3-.5a.6.6 0 0 0 0-.5l-.9-2.2c-.2-.5-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.6 3.6 0 0 0-1.1 2.7 6.3 6.3 0 0 0 1.3 3.3 14.4 14.4 0 0 0 5.6 4.9 18.8 18.8 0 0 0 1.9.7 4.5 4.5 0 0 0 2 .1 3.3 3.3 0 0 0 2.2-1.6 2.7 2.7 0 0 0 .2-1.6c-.1-.1-.3-.2-.6-.3Z" />
      </svg>
      {label}
    </a>
  );
}
