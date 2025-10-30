import { Input } from "@/components/ui/input";

interface CustomSearchInputProps {
    onSearch: (value: string) => void;
    placeholder?: string;
}

export function CustomSearchInput({ onSearch, placeholder = "Search by id or name..." }: CustomSearchInputProps) {
    return (
        <div className="m-4 text-gray-500">
            <p>Search</p>
            <Input
                type="text"
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}