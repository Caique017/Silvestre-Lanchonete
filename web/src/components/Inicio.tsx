import Logo from '/assets/Logo.png'

export function Inicio() {
  return (
    <div className="bg-[url('/assets/plano_fundo.png')] bg-[length:100%_85%] bg-no-repeat h-160 w-full bg-[#EF6A11] text-white p-4 flex justify-end">
        <div className="w-2/3">
            <h1 className="text-[#EF6A11] font-poppins text-6xl font-extrabold ml-28 w-full">Sabor e Tradição</h1>
            <br/>
            <h2 className="font-poppins text-6xl font-extrabold ml-28">Com a Alma Brasileira</h2>
            <p className="font-poppins mt-10 text-2xl w-7/12 ml-28">Se você busca uma experiência gastronômica única, nosso restaurante é o lugar ideal! Localizado na charmosa Zona Sul, oferecemos um ambiente aconchegante e um cardápio irresistível, repleto de pratos preparados com ingredientes frescos e selecionados.</p>
        </div>
        <div className="w-1/3 flex">
            <img className="h-16 lg:h-80" src={Logo} alt="Logo" /></div>
      </div>
  )
}