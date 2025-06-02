import Talheres from '/assets/Talheres.png'
import Feijoada from '/assets/feijoada.jpg'
import Virado from '/assets/Virado_a_Paulista_1.jpg'
import BifeRole from "/assets/bife_a_role.jpg"
import Macarrao from "/assets/macarronada-coxa-sobrecoxa-frango 1.jpg"
import Peixe from "/assets/file_de_peixe.jpg"
import Parmegiana from "/assets/parmegiana.jpg"

export function DestaqueSemana() {
  return (
    <div className="h-192 w-full bg-[#EF6A11] font-poppins flex justify-center">
      <div className="flex items-center">
        <img className="h-16 lg:h-160 ml-16" src={Talheres} alt="Talheres" />
      </div>
      <div className="w-full p-8 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {[
            {
              img: Feijoada,
              title: "Feijoada",
              desc: "Acompanha arroz soltinho, feijoada, couve, farofa, torresmo e bisteca."
            },
            {
              img: Virado,
              title: "Virado à Paulista",
              desc: "Acompanha arroz soltinho, feijão, couve, farofa, ovos e suculenta linguiça grelhada."
            },
            {
              img: BifeRole,
              title: "Bife à Rolê",
              desc: "Acompanha arroz soltinho, feijão e bife à rolê."
            },
            {
              img: Macarrao,
              title: "Macarrão com Frango",
              desc: "Acompanha Macarrão ao molho e frango cozido."
            },
            {
              img: Peixe,
              title: "Filé de Peixe",
              desc: "Acompanha arroz, feijão, filé de peixe empanado, batata frita e purê."
            },
            {
              img: Parmegiana,
              title: "Parmegiana",
              desc: "Acompanha arroz, a parmegiana de carne ou frango e batata frita."
            }
          ].map((item, index) => (
            <div key={index} className="bg-[#724A2C] text-white rounded-lg overflow-hidden shadow-lg">
              <img src={item.img} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold">{item.title}</h2>
                <p className="text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
