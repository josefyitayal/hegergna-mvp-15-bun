"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Cross } from "lucide-react";


const VariantForm = ({variants, setVariants}) => {

  // Notify the parent about changes
  const updateParent = (newVariants) => {
    setVariants(newVariants);
    setVariants(newVariants);
  };

  // Add a new variant with an empty list of attributes
  const handleAddVariant = () => {
    updateParent([
      ...variants,
      { type: "", attributes: [], id: Date.now() },
    ]);
  };

  // Update variant type
  const handleVariantChange = (id, value) => {
    const updatedVariants = variants.map((variant) =>
      variant.id === id ? { ...variant, type: value } : variant
    );
    updateParent(updatedVariants);
  };

  // delete variant
  const handleVariantDelete = (id) => {
    const afterDelete = variants.filter(item => item.id !== id)
    setVariants(afterDelete)
  }

  // Add an attribute to a variant
  const handleAddAttribute = (variantId) => {
    const updatedVariants = variants.map((variant) =>
      variant.id === variantId
        ? {
          ...variant,
          attributes: [
            ...variant.attributes,
            { name: "", price: "", stock: "", id: Date.now() },
          ],
        }
        : variant
    );
    updateParent(updatedVariants);
  };

  // Update an attribute
  const handleAttributeChange = (variantId, attributeId, field, value) => {
    const updatedVariants = variants.map((variant) =>
      variant.id === variantId
        ? {
          ...variant,
          attributes: variant.attributes.map((attr) =>
            attr.id === attributeId ? { ...attr, [field]: value } : attr
          ),
        }
        : variant
    );
    updateParent(updatedVariants);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Add Variant Button */}
      <Button variant="secondary" onClick={handleAddVariant} className="w-2/4" type="button">
        Add Variant
      </Button>

      {/* List of Variants */}
      {variants.map((variant) => (
        <div key={variant.id} className="p-3 border rounded-md space-y-4 ">
          <div className="flex items-center justify-between">
            <Select
              onValueChange={(value) => handleVariantChange(variant.id, value)}
              className="w-full"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Variant Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Size">Size</SelectItem>
                <SelectItem value="Color">Color</SelectItem>
                <SelectItem value="Material">Material</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="icon" onClick={() => handleVariantDelete(variant.id)}>
              <Cross />
            </Button>
          </div>

          {/* Add Attribute Button */}
          <Button
            onClick={() => handleAddAttribute(variant.id)}
            type="button"
            variant="secondary"
          >
            Add Attribute
          </Button>

          {/* List of Attributes */}
          {variant.attributes.map((attribute) => (
            <div key={attribute.id} className="grid grid-cols-3 gap-4 mt-2">
              <Input
                type="text"
                placeholder="Name"
                value={attribute.name}
                onChange={(e) =>
                  handleAttributeChange(
                    variant.id,
                    attribute.id,
                    "name",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                placeholder="Price"
                value={attribute.price}
                onChange={(e) =>
                  handleAttributeChange(
                    variant.id,
                    attribute.id,
                    "price",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                placeholder="Stock"
                value={attribute.stock}
                onChange={(e) =>
                  handleAttributeChange(
                    variant.id,
                    attribute.id,
                    "stock",
                    e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VariantForm;

