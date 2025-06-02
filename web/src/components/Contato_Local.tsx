import whats from '/assets/whats.png'
import insta from '/assets/insta.png'

function ContatoLocal() {
  return (
    <section className="h-192 font-poppins mt-12 flex w-full flex-row items-center justify-around space-y-5 lg:flex-row pt-8 lg:items-start lg:space-x-5 lg:space-y-0 bg-[#724A2C]">
      <div className="mt-10 w-11/12 rounded-lg p-3 md:w-2/3 lg:w-1/4">
      <h1 className="text-4xl">Quem somos</h1>
        <p className="w-full pt-6 text-left text-base text-white lg:w-80 2xl:w-96 2xl:text-2xl">
          Na Silvestre Lanchonete e Hamburgueria, acreditamos que uma refeição vai além do sabor: é uma experiência! Localizados na Vila Santa Catarina, em São Paulo, nossa missão é proporcionar momentos deliciosos em um ambiente acolhedor, onde cada cliente se sente em casa. Estamos prontos para te atender com muito carinho e dedicação.
        </p>
        <div className=" flex w-full flex-row justify-center gap-5 pt-5 lg:w-40 lg:justify-start">
          <a 
  href="https://wa.me/5511977468366" 
  target="_blank" 
  rel="noopener noreferrer" 
>
            <button
              className="h-10 w-10 border-none bg-transparent"
              type="button"
            >
              <img src={whats} alt="WhatsApp" />
            </button>
          </a>
          <a 
  href="https://www.instagram.com/silvestre_lanchonete?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
  target="_blank" 
  rel="noopener noreferrer"
>
            <button
              className="h-10 w-10 border-none bg-transparent"
              type="button"
            >
              <img src={insta} alt="Instagram" />
            </button>
          </a>
        </div>
      </div>
      <div className="h-full w-11/12 p-4 md:h-96 md:w-2/3 lg:h-auto lg:w-1/2">
        <iframe
          title="Meu Iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.766356433943!2d-46.6587291!3d-23.648536999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5bc79c46996b%3A0x3d9bcb8e22665dc2!2sSilvestre%20Lanchonete%20e%20Hambugueria!5e0!3m2!1spt-BR!2sbr!4v1713741921956!5m2!1spt-BR!2sbr"
          width="100%"
          height="500"
          className="rounded-lg mt-8"
        ></iframe>
        <p>Endereço: R. Rishin Matsuda, 508 
Vila Santa Catarina, São Paulo - SP
</p>
      </div>
    </section>
  )
}

export default ContatoLocal
