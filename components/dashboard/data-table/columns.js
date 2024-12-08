"use client"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns= [
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
]
