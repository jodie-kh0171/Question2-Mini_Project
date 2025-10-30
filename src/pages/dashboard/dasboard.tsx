"use client";

import { useState, useMemo, useEffect } from "react";
import { DataTable } from "@/src/components/DataTable";
import { HeaderTitle } from "@/src/components/HeaderTitle";
import { CustomSearchInput } from "@/src/components/sub-components/CustomSearchInput";
import { CustomSelectCategory } from "@/src/components/sub-components/CustomSelect";
import { EditItemModal } from "@/src/components/EditItemModal";
import { _createTableColumns } from "./columns/tableColumns";
import { Item, mockItems } from "@/src/mockdata";


export default function DashboardInventory() {
    const [items, setItems] = useState<Item[]>(mockItems);
    const [searchValue, setSearchValue] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Get unique categories from items
    const categories = useMemo(() => {
        const uniqueCategories = new Set(items.map(item => item.category));
        return Array.from(uniqueCategories);
    }, [items]);
    
    // Filter items based on search and category
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesSearch = searchValue === "" ||
                item.id.toString().includes(searchValue) ||
                item.name.toLowerCase().includes(searchValue.toLowerCase());
            
            const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });
    }, [items, searchValue, categoryFilter]);

    // Function to delete an item
    const handleDeleteItem = (id: number) => {
        if (confirm("Are you sure you want to delete this item?")) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    // Function to open the edit modal
    const handleEditItem = (item: Item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    // Function to save the edited item
    const handleSaveItem = (updatedItem: Item) => {
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
        setIsModalOpen(false);
        setEditingItem(null);
    };
    useEffect(() => {
        (window as any).deleteItem = handleDeleteItem;
        (window as any).editItem = handleEditItem;
        
        return () => {
            delete (window as any).deleteItem;
            delete (window as any).editItem;
        };
    }, [items]);

    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                <HeaderTitle />
                <div className="grid grid-cols-3 h-[154px] bg-white rounded-md shadow-xs mt-4">
                    <CustomSearchInput 
                        onSearch={setSearchValue}
                        placeholder="Search by id or name..."
                    />
                    <CustomSelectCategory 
                        onCategoryChange={setCategoryFilter}
                        categories={categories}
                    />
                </div>
                <DataTable
                    columns={_createTableColumns}
                    data={filteredItems}
                />
                <EditItemModal
                    item={editingItem}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setEditingItem(null);
                    }}
                    onSave={handleSaveItem}
                />
            </div>
        </>
    );
}