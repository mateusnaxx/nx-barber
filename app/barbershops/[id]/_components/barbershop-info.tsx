"use client";

import { Button } from "@/app/_components/ui/button";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopDetailsPageProps {
    barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopDetailsPageProps) => {
    const router = useRouter()
    const handleBackClick = () => {
        router.back()
    }

    return (
        <div>
            <div className="h-[250px] w-full relative">
                <Button onClick={handleBackClick} size="icon" variant="outline" className="z-50 absolute top-4 left-4">
                    <ChevronLeftIcon />
                </Button>
                <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4">
                    <MenuIcon />
                </Button>
                <Image
                    src={barbershop.imageUrl}
                    fill
                    alt={barbershop.name}
                    style={{ objectFit: "cover" }}
                    className="opacity-75"
                />
            </div>

            <div className="px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <h1 className="text-xl font-bold">{barbershop.name}</h1>
                <div className="flex itens-center gap-1 mt-2">
                    <MapPinIcon className="text-primary" size={18} />
                    <h1 className="text-sm">{barbershop.address}</h1>
                </div>
                <div className="flex itens-center gap-1 mt-2">
                    <MapPinIcon className="text-primary" size={18} />
                    <h1 className="text-sm">5,0 (899 avaliações)</h1>
                </div>
            </div>
        </div>
    );
};

export default BarbershopInfo;
