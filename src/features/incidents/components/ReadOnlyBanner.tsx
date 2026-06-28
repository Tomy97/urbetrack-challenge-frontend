import { Lock } from 'lucide-react';

export const ReadOnlyBanner = () => (
  <div className="border-warning/40 bg-warning/10 text-warning flex items-start gap-2 rounded-lg border px-4 py-3 text-sm">
    <Lock className="mt-0.5 h-4 w-4 shrink-0" />
    <p>
      Estados de solo lectura — la API mock no expone{' '}
      <span className="font-mono">PATCH/PUT /incidents/:id</span>, no se puede
      cambiar el estado desde este prototipo.
    </p>
  </div>
);
