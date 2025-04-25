import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarefas pelo Mundo",
  description: "'Tarefas pelo Mundo' é um projeto de código aberto que visa ajudar pessoas a salvar tarefas em todo o mundo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="header">
          <h1>Tarefas pelo mundo</h1>
        </div>
        {children}
      </body>
    </html>
  );
}
