import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Card } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const statusColors = {
  "for review": "blue",
  cancelled: "red",
  completed: "green",
  delivering: "blue",
  pending: "amber",
  shipping: "amber",
};

export const projectsColumns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "dateFinished",
    header: "Date Finished",
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(row.original.orderDate);

      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "worker",
    header: "Worker",
  },
  {
    accessorKey: "service",
    header: "Service Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={cn(
          "rounded-full flex justify-center items-center p-1 capitalize min-w-[75px]",
          `text-${statusColors[row.original.status]}-500`,
          `bg-${statusColors[row.original.status]}-50`
        )}
      >
        {row.original.status}
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <Button variant="outline" className="float-right flex gap-2">
          <Eye size={24} strokeWidth={1.5} />
          <span>View</span>
        </Button>
      );
    },
  },
];

export function ProjectsTable({ data, columns }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="w-[850px]">
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
                );
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
    </Card>
  );
}
