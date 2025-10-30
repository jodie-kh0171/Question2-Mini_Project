import { Check } from "lucide-react";

export function HeaderTitle() {
    return (
        <div className="h-[74px] bg-white rounded-md shadow-xs">
            <div className="flex p-6 font-bold">
                <Check className="mr-4 size-5 bg-[#6C5CE7] rounded-2xl text-white"/> 
                <h2>Inventory Dashboard</h2>
            </div>
        </div>
    );
}