import * as React from "react";
import { cn } from "../../lib/utils";

const Table = React.forwardRef(function Table({ className, ...props }, ref) {
  return React.createElement(
    "div",
    { className: "relative w-full overflow-auto" },
    React.createElement("table", {
      ref: ref,
      className: cn("w-full caption-bottom text-sm", className),
      ...props,
    })
  );
});
Table.displayName = "Table";

const TableHeader = React.forwardRef(function TableHeader(
  { className, ...props },
  ref
) {
  return React.createElement("thead", {
    ref: ref,
    className: cn("[&_tr]:border-b border-[#0b529c]/20", className),
    ...props,
  });
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(function TableBody(
  { className, ...props },
  ref
) {
  return React.createElement("tbody", {
    ref: ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props,
  });
});
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(function TableFooter(
  { className, ...props },
  ref
) {
  return React.createElement("tfoot", {
    ref: ref,
    className: cn(
      "border-t border-[#0b529c]/20 bg-[#0b529c]/5 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props,
  });
});
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(function TableRow(
  { className, ...props },
  ref
) {
  return React.createElement("tr", {
    ref: ref,
    className: cn(
      "border-b border-[#0b529c]/10 transition-colors hover:bg-[#0b529c]/10 data-[state=selected]:bg-[#0b529c]/20",
      className
    ),
    ...props,
  });
});
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(function TableHead(
  { className, ...props },
  ref
) {
  return React.createElement("th", {
    ref: ref,
    className: cn(
      "h-12 px-4 text-left align-middle font-medium text-[#0b529c] [&:has([role=checkbox])]:pr-0",
      className
    ),
    ...props,
  });
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(function TableCell(
  { className, ...props },
  ref
) {
  return React.createElement("td", {
    ref: ref,
    className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className),
    ...props,
  });
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(function TableCaption(
  { className, ...props },
  ref
) {
  return React.createElement("caption", {
    ref: ref,
    className: cn("mt-4 text-sm text-[#0b529c]/70", className),
    ...props,
  });
});
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
