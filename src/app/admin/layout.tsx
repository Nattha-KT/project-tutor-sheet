import ProviderWrapper from "@/context/NextAuthWrapper";
import { getAuthSession } from "@/lib/auth";
import { AdminSpeedDial } from "./_components/Speedial";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  return (
    <main className=" container flex min-w-full px-10 min-h-full ">
      <ProviderWrapper session={session}>
        <AdminSpeedDial />
          {children}
      </ProviderWrapper>
    </main>
  );
}
