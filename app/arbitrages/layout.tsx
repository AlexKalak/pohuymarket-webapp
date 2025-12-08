import Header from "@/src/features/header/ui/Header";

export default function ArbitragesLayout({ children }) {
  return <div>
    <Header />
    <main>
      {children}
    </main>
  </div>

}
