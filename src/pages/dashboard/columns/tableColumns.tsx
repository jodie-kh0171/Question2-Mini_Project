"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Item } from "@/src/mockdata";
import { ColumnDef } from "@tanstack/react-table";

export const _createTableColumns: ColumnDef<Item>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "price",
        header: "Price ($)",
    },
    {
        accessorKey: "stock",
        header: "Stock",
    },
    {
        accessorKey: "rating",
        header: "Rating",
    },
    {
        accessorKey: "created",
        header: "Created",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const handleDelete = () => {
                if (typeof window !== 'undefined' && (window as any).deleteItem) {
                    (window as any).deleteItem(row.original.id);
                } else {
                    // Fallback for development
                    if (confirm(`Are you sure you want to delete item "${row.original.name}"?`)) {
                        alert(`Deleted item with ID: ${row.original.id}`);
                    }
                }
            };

            const handleEdit = () => {
                if (typeof window !== 'undefined' && (window as any).editItem) {
                    (window as any).editItem(row.original);
                } else {
                    // Fallback for development
                    alert(`Editing item with ID: ${row.original.id}`);
                }
            };

            return (
                <div>
                    <button
                        className="bg-[#6C5CE7] size-8 mr-2 text-white w-14 rounded-md"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-[#E74C3C] size-8 w-14 text-white rounded-md"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            );
        }
    }
];
