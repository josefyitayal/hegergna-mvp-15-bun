import { z } from "zod"

// title, description, images, price, comparePrice, profit, cost, margin, isPublish, category, stock, sku, collections, variants

export const productZodSchema = z.object({
    title: z.string().min(1, "The title must be at least 1 letter"),
    description: z.string().min(10, "The description must be at least 10 letter"),
    media: z.array(
        z.object({
            fileId: z.string(),
            name: z.string(),
            filePath: z.string(),
            thumbnailUrl: z.string(),
            url: z.string()
        })
    ).min(1).max(2),
    price: z.number().positive("Price must be a positive number"),
    comparePrice: z.number().positive().optional(),
    profit: z.number().positive().nullable().optional(),
    cost: z.number().positive("Cost must be a positive number"),
    margin: z.string(),
    isPublished: z.boolean().optional().default(false),
    category: z.string().nullable().optional(),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
    sku: z.string().nullable().optional(),
    collection: z
        .array(
            z.object({
                id: z.string().uuid(),
                name: z.string().min(1, "Collection name is required"),
                description: z.string().nullable().optional(),
                isActive: z.boolean().optional(),
            })
        )
        .optional(),
    variant: z
        .array(
            z.object({
                id: z.string().uuid(),
                productId: z.string().uuid(),
                type: z.enum(['Size', 'Color', 'Material']),
                attribute: z
                    .array(
                        z.object({
                            id: z.string().uuid(),
                            variantId: z.string().uuid(),
                            name: z.string().min(1, "Name is required"),
                            price: z.number().positive("Price must be a positive number"),
                            stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
                        })
                    )
                    .optional(),
            })
        )
        .optional(),
})