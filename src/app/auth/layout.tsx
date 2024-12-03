/** @format */

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center flex-col my-auto">
      <div className="flex flex-col gap-1 mb-4 text-center border-b border-accent pb-4 w-[480px]">
        <div className="font-title text-4xl">Welcome to Vessel.</div>
        <div className="text-sm opacity-75 mb-4">
          To get started, please sign in or sign up:
        </div>
      </div>
      {children}
    </div>
  );
}
