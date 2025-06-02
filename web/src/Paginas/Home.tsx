import { Inicio } from '../components/Inicio';
import { Header } from '../components/Header';
import ContatoLocal from '../components/Contato_Local';
import { DestaqueSemana } from '../components/DestaqueSemana';
import { Footer } from '@/components/footer';
// import AdminProduto from './AdminProduto'

export function Home() {
  return (
    <section className="Home bg-[#EF6A11]">
      <Header />
      <Inicio />
      <DestaqueSemana />
      <ContatoLocal />
      <Footer />
      {/* <AdminProduto /> */}
    </section>
  );
}
