import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import { CreateIncidentForm } from '../form/CreateIncidentForm';
import { useReportIncidentDialog } from '@/shared/hooks/useReportIncidentDialog';

export const ReportIncidentDialog = () => {
  const dialog = useReportIncidentDialog();

  return (
    <Dialog open={dialog.open} onOpenChange={dialog.setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Reportar incidente</span>
          <span className="sm:hidden">Reportar</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Reportar incidente</DialogTitle>
          <DialogDescription>
            El estado inicial siempre es{' '}
            <span className="font-mono">REPORTED</span>.
          </DialogDescription>
        </DialogHeader>
        <CreateIncidentForm {...dialog} />
      </DialogContent>
    </Dialog>
  );
};
