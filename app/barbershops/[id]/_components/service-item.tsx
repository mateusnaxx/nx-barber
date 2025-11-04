"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { time } from "console";
import { format } from "date-fns";

interface ServiceItemProps {
    barbershop: Barbershop;
    service: Service;
    isAutheticated: boolean;
}

const ServiceItem = ({ service, isAutheticated, barbershop }: ServiceItemProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [hour, setHour] = useState<string | undefined>();

    const handleDateClick = (date: Date | undefined) => {
        setDate(date);
        setHour(undefined);
    };

    const handleHourClick = (time: string) => {
        setHour(time);
    };

    const handleBookingClick = () => {
        if (!isAutheticated) {
            return signIn("google");
        }

        // TODO: Abrir modal de agendamento
    };

    const timelist = useMemo(() => {
        return date ? generateDayTimeList(date) : [];
    }, [date]);

    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                        <Image
                            className="rounded-lg"
                            src={service.imageUrl}
                            fill
                            style={{ objectFit: "contain" }}
                            alt={service.name}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="flex items-center justify-between mt-3">
                            <p className="text-primary text-sm font-bold">
                                {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(Number(service.price))}
                            </p>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="secondary" onClick={handleBookingClick}>
                                        Reservar
                                    </Button>
                                </SheetTrigger>

                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>Fazer reserva</SheetTitle>
                                    </SheetHeader>

                                    <div className="py-6  px-2">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            locale={ptBR}
                                            disabled={{ before: new Date() }}
                                            className="mt-6 w-full capitalize"
                                        />
                                    </div>

                                    {/* Mostrar  lista de horários apenas após selecionar um dia */}
                                    {date && (
                                        <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secondary [&::-webkit-scrollbar]:hidden">
                                            {timelist.map((time) => (
                                                <Button
                                                    onClick={() => handleHourClick(time)}
                                                    variant={hour === time ? "default" : "outline"}
                                                    className="rounded-full border-0 shadow-[inset_0_0_0_1px_hsl(var(--border))]"
                                                    key={time}
                                                >
                                                    {time}
                                                </Button>
                                            ))}
                                        </div>
                                    )}

                                    <div className="py-6 px-5 border-t border-solid border-secondary">
                                        <Card>
                                            <CardContent className="p-3 gap-3 flex flex-col">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <h3 className="font-bold text-sm">
                                                        {Intl.NumberFormat("pt-BR", {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        }).format(Number(service.price))}
                                                    </h3>
                                                </div>

                                                <div className="flex justify-between">
                                                    <h3 className="font-sm text-gray-400">Barbearia</h3>
                                                    <h4 className="font-sm text-sm">{barbershop.name}</h4>
                                                </div>

                                                {date && (
                                                    <div className="flex justify-between">
                                                        <h3 className="font-sm text-gray-400">Data</h3>
                                                        <h4 className="font-sm text-sm">
                                                            {format(date, "dd", { locale: ptBR }) + " de "}
                                                            <span className="capitalize">
                                                                {format(date, "MMMM", { locale: ptBR })}
                                                            </span>
                                                        </h4>
                                                    </div>
                                                )}
                                                
                                                {hour && (
                                                    <div className="flex justify-between">
                                                        <h3 className="font-sm text-gray-400">Horário</h3>
                                                        <h4 className="font-sm text-sm">{hour}</h4>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <SheetFooter  className="px-5">
                                        {<Button disabled={!hour || !date}>Confirmar reserva</Button>}
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ServiceItem;
