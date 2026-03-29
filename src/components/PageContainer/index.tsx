export default function PageContainer({ children }: { children: React.ReactNode }) {
  return <main className="pt-9 pb-20 md:pt-14 md:pb-22 bg-background -mb-8">{children}</main>
}
