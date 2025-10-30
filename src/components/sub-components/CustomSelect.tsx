interface CustomSelectCategoryProps {
    onCategoryChange: (value: string) => void;
    categories: string[];
}

export function CustomSelectCategory({ onCategoryChange, categories }: CustomSelectCategoryProps) {
    return (
        <div className="m-4 text-gray-500">
            <p>Category</p>
            <select
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">All</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}