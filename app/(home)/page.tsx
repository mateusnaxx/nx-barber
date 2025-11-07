import { Suspense } from "react";
import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function Home() {
    const session = await getServerSession(authOptions);

    const currentDate = new Date();

    const [barbershop, recommendedBarbershops, confirmedBookings] = await Promise.all([
        db.barbershop.findMany({}),
        db.barbershop.findMany({
            orderBy: {
                id: "asc",
            },
        }),
        session?.user
            ? db.booking.findMany({
                  where: {
                      userId: (session.user as any).id,
                      date: {
                          gte: new Date(),
                      },
                  },
                  include: {
                      service: true,
                      barbershop: true,
                  },
              })
            : Promise.resolve([]),
    ]);

    return (
        <div>
            <Header />

            <div className="px-5 pt-5">
                <h2 className="text-xl font-bold">
                    {session?.user ? `Olá, ${session.user.name?.split(" ")[0]}` : "Olá, vamos agendar um corte hoje?"}
                </h2>
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

            {/* <div className="mt-6">
                {confirmedBookings.length > 0 && (
                    <>
                        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>

                        <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                            {confirmedBookings.map((booking) => (
                                <BookingItem key={booking.id} booking={booking} />
                            ))}
                        </div>
                    </>
                )}
            </div> */}

            {/* SUSPENSE: Agendamentos */}
            <Suspense fallback={<p className="px-5 text-gray-400 animate-pulse">Carregando agendamentos...</p>}>
                {confirmedBookings.length > 0 && (
                    <div className="mt-6">
                        <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
                        <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                            {confirmedBookings.map((booking) => (
                                <BookingItem key={booking.id} booking={booking} />
                            ))}
                        </div>
                    </div>
                )}
            </Suspense>

            {/* <div className="mt-6">
                <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

                <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {barbershop.map((barbershop) => (
                        <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        </div>
                    ))}
                </div>
            </div> */}

            {/* SUSPENSE: Recomendados */}
            <Suspense fallback={<p className="px-5 text-gray-400 animate-pulse">Carregando barbearias...</p>}>
                <div className="mt-6">
                    <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>
                    <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                        {barbershop.map((b) => (
                            <div key={b.id} className="min-w-[167px] max-w-[167px]">
                                <BarbershopItem barbershop={b} />
                            </div>
                        ))}
                    </div>
                </div>
            </Suspense>

            {/* <div className="mt-6 mb-[4.5rem]">
                <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

                <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {recommendedBarbershops.map((barbershop) => (
                        <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        </div>
                    ))}
                </div>
            </div> */}

            {/* SUSPENSE: Populares */}
            <Suspense fallback={<p className="px-5 text-gray-400 animate-pulse">Carregando populares...</p>}>
                <div className="mt-6 mb-[4.5rem]">
                    <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>
                    <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                        {recommendedBarbershops.map((b) => (
                            <div key={b.id} className="min-w-[167px] max-w-[167px]">
                                <BarbershopItem barbershop={b} />
                            </div>
                        ))}
                    </div>
                </div>
            </Suspense>
        </div>
    );
}
