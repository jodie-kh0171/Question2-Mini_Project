"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    className?: string
    searchParams?: { placeholder: string; column: string }[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchParams = [],
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <div className="overflow-hidden rounded-md border bg-white shadow-xs mt-8">
            {searchParams.length > 0 && (
                <div className="flex flex-wrap gap-2.5 p-4">
                    {searchParams.map((item, index) => (
                        <div key={index} className="relative flex items-center rounded-md h-9 border pl-2 focus-within:ring-1 focus-within:ring-ring flex-1 min-w-[200px]">
                            <SearchIcon className="h-5 w-5 text-muted-foreground" />
                            <Input
                                placeholder={item.placeholder}
                                value={(table.getColumn(item.column)?.getFilterValue() as string) ?? ""}
                                onChange={(e) =>
                                    table.getColumn(item.column)?.setFilterValue(e.target.value)
                                }
                                className="border-0 focus-visible:ring-0 shadow-none"
                            />
                        </div>
                    ))}
                </div>
            )}
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="bg-[#6C5CE7] w-32 m-4 p-2 text-white rounded-md text-center" >
                <button>Delete Selected</button>
            </div>
        </div>
    )
}