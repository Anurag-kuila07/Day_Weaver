import { Logo } from "@/components/icons";

export default function AppHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center gap-4">
        <Logo className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold text-foreground font-headline">
          Day Weaver
        </h1>
      </div>
    </header>
  );
}
