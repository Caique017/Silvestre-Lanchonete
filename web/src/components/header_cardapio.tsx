import { CircleUserRound, Menu, Search, ShoppingBag, Trash, LogOut } from 'lucide-react'; // Adicionado LogOut
import React, { useState, Fragment, useEffect, useCallback } from 'react'; // Adicionado React, useCallback
import { NavLink } from './nav-link';
import { Toaster, toast } from 'sonner';
import { dishes } from './menu';
import { Main } from './main';
import { useNavigate, useLocation } from 'react-router-dom'; // Adicionado useLocation
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Dialog, DialogContent, DialogTrigger } from '../components/dialog';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

interface MenuProps {
  nome: string;
  nameSection: string | null;
  id: number;
  valor:string;
  imageSrc?: string;
}

export function Header() {
  // Estados para o sistema de login customizado
  const [isCustomAuthenticated, setIsCustomAuthenticated] = useState(false);
  const [currentUserName, setCurrentUserName] = useState<string | null>(null);


  const [searchText, setSearchText] = useState('');
  const [selectedDishes, setSelectedDishes] = useState<MenuProps[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Verifica o estado de login customizado no localStorage
  const checkCustomAuthState = useCallback(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (token) {
      setIsCustomAuthenticated(true);
      setCurrentUserName(name || 'Usuário');
    } else {
      setIsCustomAuthenticated(false);
      setCurrentUserName(null);
    }
  }, []);

  useEffect(() => {
    checkCustomAuthState();
  }, [location.pathname, checkCustomAuthState]); // Re-verificar quando a rota muda (ex: após login)

  // Função de logout para o sistema customizado
  const handleCustomLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('name');
    setIsCustomAuthenticated(false);
    setCurrentUserName(null);
    setSelectedDishes([]); // Limpa o carrinho ao fazer logout
    setTotalPrice(0);
    toast.info('Você foi desconectado.');
    navigate('/'); // Redireciona para a home ou página de login
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  function handleNavLinkClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    if (targetId) {
      scrollToSection(targetId.slice(1));
    }
  }

  function scrollToSection(sectionId: string) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const headerHeight =
        document.querySelector('.header')?.getBoundingClientRect().height || 0;
      let targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      targetPosition -= 140;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  }

  const addToBag = (dish: MenuProps) => {
    // Se você QUISER restringir a adição ao carrinho apenas para usuários logados (custom auth):
    // if (!isCustomAuthenticated) {
    //   toast.error('Faça login para adicionar itens à sacola.');
    //   navigate('/login'); // Opcional: redirecionar para login
    //   return;
    // }
    setSelectedDishes((prevDishes) => [...prevDishes, dish]);
    setTotalPrice(
      (prevTotal) =>
        prevTotal + parseFloat(dish.valor.replace(/A partir de: R\$ /g, '').replace(',', '.')),
    );
    toast.success(`${dish.nome} adicionado à sacola!`);
  };

  const removeFromBag = (dish: MenuProps) => {
    setSelectedDishes((prevDishes) =>
      prevDishes.filter((d) => d.id !== dish.id),
    );
    setTotalPrice(
      (prevTotal) =>
        prevTotal - parseFloat(dish.valor.replace(/A partir de: R\$ /g, '').replace(',', '.')),
    );
    toast.error(`${dish.nome} removido da sacola.`);
  };

  function formatarPedido() {
    let mensagem = `Olá, Silvestre Lanchonete! Gostaria de fazer o seguinte pedido feito por ${currentUserName || 'um cliente'}:\n\n`;
    selectedDishes.forEach((dish) => {
      mensagem += `- ${dish.nome} (${dish.valor})\n`;
    });
    mensagem += `\nTotal: R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
    return mensagem;
  }

  return (
    <div>
      <Toaster position="top-right" richColors />
      <div className="fixed z-10 flex w-full flex-col gap-3 border-b border-white/10 bg-zinc-900 px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="mt-4 flex items-center justify-between gap-3 md:mt-6">
          <button
            onClick={handleNavigateHome}
            className="text-lg font-bold text-zinc-50 transition duration-300 hover:text-orange-500 md:text-xl xl:text-2xl 2xl:text-3xl"
          >
            Silvestre Lanchonete
          </button>

          <div className="hidden md:flex flex-grow items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5 lg:mx-8 xl:mx-16 2xl:mx-24 max-w-xs md:max-w-sm lg:max-w-md">
            <Search className="size-4 text-orange-500 xl:size-5" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0 md:text-base"
              placeholder="Buscar no cardápio..."
            />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* SACOLA DE COMPRAS - Visível se logado pelo sistema customizado */}
            {isCustomAuthenticated && (
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative flex items-center rounded-md p-1.5 text-orange-500 transition-colors hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                    <ShoppingBag className="size-5 md:size-6" />
                    {selectedDishes.length > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                        {selectedDishes.length}
                      </span>
                    )}
                    <span className="sr-only">Abrir sacola</span>
                  </button>
                </DialogTrigger>
                <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-lg bg-zinc-950 shadow-lg">
                  <div className="flex items-center justify-center gap-4 p-4 border-b border-zinc-800">
                    <ShoppingBag className="size-6 text-zinc-300 md:size-7" />
                    <p className="text-lg font-semibold text-zinc-100 md:text-xl">
                      Sacola de Pedidos
                    </p>
                  </div>
                  {selectedDishes.length === 0 ? (
                    <p className="py-8 text-center text-zinc-400">
                      Sua sacola está vazia.
                    </p>
                  ) : (
                    <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
                      {selectedDishes.map((selectedDish) => (
                        <div
                          key={selectedDish.id}
                          className="flex items-center justify-between gap-3 rounded-md bg-zinc-900 p-3"
                        >
                          <div className="flex-grow">
                            <h3 className="font-semibold text-zinc-100 md:text-lg">
                              {selectedDish.nome}
                            </h3>
                            <p className="text-sm text-zinc-400 md:text-base">
                              {selectedDish.valor}
                            </p>
                          </div>
                          <button
                            type="button"
                            title={`Remover ${selectedDish.nome}`}
                            onClick={() => removeFromBag(selectedDish)}
                            className="rounded-md p-1.5 text-red-500 transition-colors hover:bg-red-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                          >
                            <Trash className="size-4 md:size-5" />
                            <span className="sr-only">Remover item</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {selectedDishes.length > 0 && (
                    <div className="space-y-3 border-t border-zinc-800 p-4">
                      <div className="flex justify-between text-sm text-zinc-300">
                        <p>Itens:</p>
                        <p>{selectedDishes.length}</p>
                      </div>
                      <div className="flex justify-between text-lg font-semibold text-zinc-100">
                        <p>Total:</p>
                        <p>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
                      </div>
                      <a
                        href={`https://wa.me/5511977468366?text=${encodeURIComponent(formatarPedido())}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 flex h-11 w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 2xl:h-12"
                      >
                        Confirmar Pedido no WhatsApp
                      </a>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            )}

            {/* MENU LATERAL (SHEET) */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="rounded-md p-1.5 text-orange-500 transition-colors hover:text-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-2">
                  <Menu className="size-5 md:size-6" />
                  <span className="sr-only">Abrir menu</span>
                </button>
              </SheetTrigger>
              <SheetContent className="w-[calc(100%-2rem)] max-w-xs space-y-3 border-l border-white/10 bg-zinc-900 text-zinc-50 sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>
                    {isCustomAuthenticated ? ( // Usa o estado de login customizado
                      <div className="space-y-3 py-2">
                        <span className="flex items-center gap-3 text-base font-bold text-zinc-50">
                          <CircleUserRound className="size-6 text-orange-500" />
                          {currentUserName || 'Usuário'} {/* Mostra o nome do localStorage */}
                        </span>
                        <Separator className="bg-zinc-800" />
                      </div>
                    ) : (
                      <div className="space-y-3 py-2">
                        <span className="text-base font-bold text-zinc-50">
                          Bem-vindo(a)!
                        </span>
                        <Separator className="bg-zinc-800" />
                      </div>
                    )}
                  </SheetTitle>
                  <SheetDescription asChild>
                    <div className="flex flex-col gap-4 pt-2">
                      {isCustomAuthenticated ? ( // Usa o estado de login customizado
                        <div className="space-y-4">
                          {/* Você pode adicionar links para "Meus Pedidos", "Meu Perfil" aqui se desejar */}
                          <div className="text-sm text-zinc-300">Gerencie sua conta e pedidos.</div>
                           <Button 
                            onClick={handleCustomLogout} // Botão de Logout Customizado
                            variant="ghost" 
                            className="w-full justify-start gap-2 px-2 py-1.5 text-red-500 hover:bg-red-500/10 hover:text-red-400"
                          >
                            <LogOut className="size-4" />
                            Sair
                          </Button>
                          {/* Se ainda quiser usar MobileNavLinks e ele tiver apenas o logout do Auth0, precisará adaptar MobileNavLinks
                              ou remover o logout de lá e usar este botão.
                          <MobileNavLinks
                            isLogout={true} 
                            showMenuButton={false}
                            // onLogout={handleCustomLogout} // Idealmente passaria a função de logout
                          /> */}
                        </div>
                      ) : (
                        <div className="space-y-3">
                           <p className="text-sm text-zinc-400">Faça login para ver seus pedidos e agilizar suas compras.</p>
                          <Button
                            onClick={() => navigate('/login')} // Alterado para navegar para /login
                            className="w-full bg-orange-600 font-semibold text-white hover:bg-orange-700"
                          >
                            Fazer Login ou Criar Conta
                          </Button>
                          {/* Opção de login com Auth0, se ainda quiser oferecer */}
                          {/* <Button
                            onClick={() => loginWithAuth0Redirect()}
                            variant="outline"
                            className="w-full"
                          >
                            Login com Auth0 (Alternativo)
                          </Button> */}
                        </div>
                      )}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5 mx-auto w-full max-w-xs my-2">
            <Search className="size-4 text-orange-500" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
              placeholder="Buscar no cardápio..."
            />
          </div>

        <div className="flex items-center overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-800 lg:justify-center">
          <nav className="flex items-center space-x-3 px-2 md:gap-5 xl:gap-6 2xl:gap-8">
            {dishes
              .filter((dish) => dish.nameSection !== null)
              .reduce((acc, dish) => {
                if (!acc.find(item => item.nameSection === dish.nameSection)) {
                  acc.push(dish);
                }
                return acc;
              }, [] as MenuProps[])
              .map((dish) => (
                <Fragment key={dish.id || dish.nameSection}>
                  {dish.nameSection && (
                    <NavLink
                      href={`#${dish.nameSection.replace(/\s+/g, '-').toLowerCase()}`}
                      onClick={handleNavLinkClick}
                      className="flex-shrink-0 whitespace-nowrap rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors hover:bg-orange-500 hover:text-zinc-900 focus:bg-orange-500 focus:text-zinc-900 focus:outline-none md:text-sm 2xl:text-base"
                    >
                      {dish.nameSection}
                    </NavLink>
                  )}
                </Fragment>
              ))}
          </nav>
        </div>
      </div>
      <Main
        searchText={searchText}
        addToBag={addToBag}
        selectedDishes={selectedDishes}
      />
      <Button className="bg-black text-black"
      onClick={() => navigate('/admin')} >......</Button>
    </div>
    
  );
}