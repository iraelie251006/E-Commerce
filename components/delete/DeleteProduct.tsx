"use client";

import { TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {deleteProduct} from "@/lib/actions/products";

export default function DeleteProduct({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const didDelete = await deleteProduct(id);

    if (didDelete) {
      router.push("/search");
    }
  }
  return (
    <div className="pt-20 flex min-h-screen items-start justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <TrashIcon className="h-12 w-12 text-red-500" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold">Are you sure?</h2>
            <p className="text-gray-500 dark:text-gray-400">
              This action cannot be undone. This will permanently delete product
              #{id}.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button onClick={handleDelete} variant="destructive">Confirm Delete</Button>
          <Button onClick={() => router.push(`/product/view/${id}`)} variant="outline">Cancel</Button>
        </div>
      </div>
    </div>
  );
}
