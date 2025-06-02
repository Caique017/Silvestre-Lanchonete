import MobileNav from './mobile-nav'

export function Header() {
  

  return (
    <div className="flex h-24 w-full items-center justify-between border border-[#724A2C] bg-[#724A2C]">
      <div className="w-50 flex items-end justify-end">
      </div>

      <div>
        <MobileNav />
      </div>
    </div>
  )
}
