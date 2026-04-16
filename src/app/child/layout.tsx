export default function ChildLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-darker">
      {children}
    </div>
  );
}
