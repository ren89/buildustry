import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "./ui/card";
import Rating from "./rating";
import WorkerProfileDialog from "./worker-profile-dialog";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const userColumns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = `${row.original.firstName} ${row.original.lastName}`;

      return <span>{name}</span>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => {
      const rating = row.original.rating;

      return <Rating value={rating} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const worker = row.original; // TODO use id for navigation

      return (
        <Link
          onClick={(e) => e.stopPropagation()}
          href={`/dashboard/messages`}
          className="float-right flex gap-2 px-4 py-2 border border-slate-300 rounded-md hover:bg-slate-200"
        >
          <Send size={24} strokeWidth={1} />
          <span>Message</span>
        </Link>
      );
    },
  },
];

export function UserTable({ data, columns }) {
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
              <WorkerProfileDialog key={row.id} worker={row.original}>
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
              </WorkerProfileDialog>
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
