import { Controller } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Lock, MapPin } from 'lucide-react';
import { useReportIncidentDialog } from '@/shared/hooks/useReportIncidentDialog';
import type { Zone } from '@/shared/types/zone';

type Props = ReturnType<typeof useReportIncidentDialog>;
export const CreateIncidentForm = ({
  control,
  errors,
  register,
  zones,
  handleClose,
  handleSubmit,
}: Props) => {
  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-2">
      <div className="grid gap-2">
        <Label>Tipo de incidente</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccioná un incidente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="OVERFLOW">Desborde</SelectItem>
                <SelectItem value="DAMAGE">Daño</SelectItem>
                <SelectItem value="LITTERING">Basura en vía pública</SelectItem>
                <SelectItem value="OTHER">Otro</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid gap-2">
        <Label>
          Descripción <span className="text-destructive">*</span>
        </Label>
        <Textarea
          {...register('description')}
          placeholder="Ej: Contenedor desbordado frente a la escuela…"
          rows={3}
          aria-invalid={!!errors.description}
        />
        {errors.description && (
          <p className="text-destructive text-xs">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>
          Zona <span className="text-destructive">*</span>
        </Label>
        <Controller
          name="zoneId"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccioná una zona" />
              </SelectTrigger>
              <SelectContent>
                {zones.map((z: Zone) => (
                  <SelectItem key={z.id} value={z.id}>
                    {z.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.zoneId && (
          <p className="text-destructive text-xs">{errors.zoneId.message}</p>
        )}
      </div>

      <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
        <div className="grid gap-1.5">
          <Label>Latitud</Label>
          <Input
            {...register('lat', { valueAsNumber: true })}
            className="font-mono"
            aria-invalid={!!errors.lat}
          />
          {errors.lat && (
            <p className="text-destructive text-[11px]">{errors.lat.message}</p>
          )}
        </div>
        <div className="grid gap-1.5">
          <Label>Longitud</Label>
          <Input
            {...register('lng', { valueAsNumber: true })}
            className="font-mono"
            aria-invalid={!!errors.lng}
          />
          {errors.lng && (
            <p className="text-destructive text-[11px]">{errors.lng.message}</p>
          )}
        </div>
        <div className="grid items-end">
          <Button type="button" variant="outline" className="gap-1.5">
            <MapPin className="h-4 w-4" /> Centro
          </Button>
        </div>
      </div>

      <div className="border-border bg-muted/40 flex items-center justify-between rounded-md border px-3 py-2">
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <Lock className="h-3.5 w-3.5" />
          Estado inicial fijo
        </div>
        <Badge
          variant="outline"
          className="border-destructive/40 bg-destructive/10 text-destructive font-mono"
        >
          REPORTED
        </Badge>
      </div>

      <DialogFooter>
        <Button type="button" variant="ghost" onClick={handleClose}>
          Cancelar
        </Button>
        <Button type="submit">Crear incidente</Button>
      </DialogFooter>
    </form>
  );
};
