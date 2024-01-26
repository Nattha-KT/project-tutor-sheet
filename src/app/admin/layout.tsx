import ProviderWrapper from "@/context/ProviderWrapper";
import { getAuthSession } from "@/lib/auth";
import { AdminSpeedDial } from "./_components/Speedial";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  return (
    <main className=" container flex min-w-full px-10 ">
      <ProviderWrapper session={session}>
        <AdminSpeedDial />
          {children}
      </ProviderWrapper>
    </main>
  );
}
