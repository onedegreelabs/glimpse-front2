import Gradient from './Gradient';

function Background({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-dvh bg-background">
      <Gradient />
      {children}
    </div>
  );
}

export default Background;
