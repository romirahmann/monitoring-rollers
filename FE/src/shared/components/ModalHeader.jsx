export function ModalHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold text-zinc-900">{title}</h3>

      {description && (
        <p className="mt-2 text-sm text-zinc-500">{description}</p>
      )}
    </div>
  );
}
