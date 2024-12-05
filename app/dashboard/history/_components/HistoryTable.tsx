"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { parse, formatDistanceToNow } from "date-fns";
import CopyButton from "./CopyButton";

const ITEMS_PER_PAGE = 10;

interface HistoryItem {
  templateSlug: string;
  templateName: string; // Added from pre-processing
  templateIcon: string; // Added from pre-processing
  aiResponse: string;
  createdAt: string;
}

interface HistoryTableProps {
  initialHistoryList: HistoryItem[];
}

const FormattedDate = ({ dateString }: { dateString: string }) => {
  try {
    // Parse the DD/MM/YYYY format
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
    return <span>{formatDistanceToNow(parsedDate)} ago</span>;
  } catch (error) {
    return <span>Invalid Date</span>;
  }
};

const HistoryTable = ({ initialHistoryList }: HistoryTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(initialHistoryList.length / ITEMS_PER_PAGE);

  // Get current items
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = initialHistoryList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Card className="m-5">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">History</CardTitle>
        <p className="text-gray-500">
          Search your previously generated AI content.
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="w-[300px]">TEMPLATE</TableHead>
                <TableHead className="w-[400px]">AI RESPONSE</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>WORDS</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((item, index) => (
                <TableRow key={index} className="hover:bg-slate-50">
                  <TableCell className="flex items-center gap-2">
                    <Image
                      src={item.templateIcon}
                      width={25}
                      height={25}
                      alt="icon"
                      className="rounded"
                    />
                    <span className="font-medium">{item.templateName}</span>
                  </TableCell>
                  <TableCell className="max-w-[400px]">
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {item?.aiResponse}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    <FormattedDate dateString={item.createdAt} />
                  </TableCell>
                  <TableCell className="text-sm">
                    {item?.aiResponse?.split(/\s+/).length || 0}
                  </TableCell>
                  <TableCell>
                    <CopyButton aiResponse={item.aiResponse} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryTable;
