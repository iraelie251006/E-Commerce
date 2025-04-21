"use client";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ImageSelect({
                                      onChange,
                                    }: {
  onChange: (value: string[]) => void;
}) {
  // Initialize with one empty string in the images array
  const [images, setImages] = useState<string[]>(['']);

  const handleAddImage = () => {
    setImages([...images, '']);
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const handleImageRemove = (index: number) => {
    // Don't allow removing the last image
    if (images.length <= 1) return;

    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  useEffect(() => {
    onChange(images);
  }, [images, onChange]);

  return (
      <div className="grid gap-2">
        <Label>Images</Label>
        <div className="grid gap-4">
          {images.map((image, index) => (
              <div key={index} className="flex gap-x-4">
                <Input
                    placeholder={`Image URL ${index + 1}`}
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                />
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleImageRemove(index)}
                    // Disable the button if this is the only input
                    disabled={images.length <= 1}
                >
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Remove Image</span>
                </Button>
              </div>
          ))}
          <Button size="icon" variant="outline" onClick={handleAddImage}>
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Add Image</span>
          </Button>
        </div>
      </div>
  );
}