import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

export default async function Home() {
    const barbershop = await db.barbershop.findMany({});
    const currentDate = new Date();
    return (
        <div>
            <Header />

            <div className="px-5 pt-5">
                <h2 className="text-xl font-bold">Olá, Miguel!</h2>
                <p className="text-sm">
                    <span className="capitalize">{format(currentDate, "EEEE", { locale: ptBR })}</span>
                    {format(currentDate, "',' dd 'de '", {
                        locale: ptBR,
                    })}
                    <span className="capitalize">{format(currentDate, "MMMM", { locale: ptBR })}</span>
                </p>
            </div>

            <div className="px-5 mt-6">
                <Search />
            </div>

            <div className="px-5 mt-6">
                <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
                <BookingItem />
            </div>

            <div className="mt-6">
                <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

                <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {barbershop.map((barbershop) => (
                        <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 mb-[4.5rem]">
                <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

                <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {barbershop.map((barbershop) => (
                        <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
