// eslint-disable-next-line import/no-absolute-path
import Icon from '/assets/icon.svg'

export function Footer() {
  return (
    <div className="flex h-44 w-full items-center bg-[#3e2201] 2xl:h-40">
      <div className="flex items-center gap-5 pl-5 md:gap-28 md:pl-10 2xl:pl-16">
        <img src={Icon} alt="Logo" className="size-36 2xl:size-24" />
        <div>
          <h3 className="font-bold md:text-xl">
            Silvestre Lanchonete
          </h3>
          <p className="pt-3 text-sm md:pt-5 md:text-base xl:text-lg 2xl:pt-6">
            © Software 2025 - Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
