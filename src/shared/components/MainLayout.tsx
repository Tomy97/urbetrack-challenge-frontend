import { type ReactNode } from 'react';
import { NavComponent } from './Nav';
import { NavbarComponent } from './NavBar';

export const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-background text-foreground flex min-h-screen w-full">
      <aside className="border-sidebar-border bg-sidebar hidden w-64 shrink-0 flex-col border-r lg:flex">
        <div className="mt-2 flex-1">
          <NavComponent />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <NavbarComponent />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
};
