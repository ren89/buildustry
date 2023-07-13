import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import ProjectRequestDialog from "./project-request-dialog";
import { useEffect, useState } from "react";

export const statusColors = {
  "for review": "blue",
  cancelled: "red",
  completed: "green",
  inProgress: "blue",
  pending: "amber",
  shipping: "amber",
};

export const projectsColumns = [
  {
    accessorKey: "name",
    header: "Project Name",
    cell: ({ row }) => {
      const name = row.original.name;

      return <span>{name}</span>;
    },
  },
  {
    accessorKey: "dateFinished",
    header: "Date Finished",
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(row.original.dateFinished);

      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "worker",
    header: "Worker",
    cell: ({ row }) => {
      const name = row.original.worker.name;

      return name;
    },
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => {
      const service = row.original.typeOfService;

      return <span>{service}</span>;
    },
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
];

export function ProjectsTable({ data, columns, filter = [] }) {
  const [columnFilters, setColumnFilters] = useState(filter);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  useEffect(() => {
    filter.map((column) => table.getColumn(column).toggleVisibility(false));
  }, [filter, table]);

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
            table.getRowModel().rows.map((row) =>
              row.original.status !== "pending" ? (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ) : (
                <ProjectRequestDialog
                  key={row.id}
                  viewOnly={true}
                  project={row.original}
                >
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className="cursor-pointer"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </ProjectRequestDialog>
              )
            )
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
