import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Category, Product, ProductFormData, ImageUploadResponse } from '@/types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  price: z.number().min(0.01, 'Preço deve ser maior que zero'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  isActive: z.boolean(),
});

export function ProductForm({ product, onSubmit, onCancel, isLoading = false }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(product?.images || []);
  const [uploadingImages, setUploadingImages] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      slug: product?.slug || '',
      description: product?.description || '',
      price: product?.price ? parseFloat(product.price.toString()) : 0,
      categoryId: product?.categoryId || '',
      isActive: product?.isActive ?? true,
    },
  });

  const watchName = watch('name');

  // Gerar slug automaticamente baseado no nome
  useEffect(() => {
    if (watchName && !product) {
      const slug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setValue('slug', slug);
    }
  }, [watchName, setValue, product]);

  // Carregar categorias
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as categorias",
          variant: "destructive"
        });
      }
    };

    fetchCategories();
  }, [toast]);

  // Manipular seleção de imagens
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length + selectedImages.length + existingImages.length > 10) {
      toast({
        title: "Limite excedido",
        description: "Máximo de 10 imagens por produto",
        variant: "destructive"
      });
      return;
    }

    // Validar tipos de arquivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Formato inválido",
        description: "Use apenas arquivos JPEG, PNG ou WebP",
        variant: "destructive"
      });
      return;
    }

    // Validar tamanho dos arquivos (5MB cada)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    
    if (oversizedFiles.length > 0) {
      toast({
        title: "Arquivo muito grande",
        description: "Cada imagem deve ter no máximo 5MB",
        variant: "destructive"
      });
      return;
    }

    setSelectedImages(prev => [...prev, ...files]);

    // Criar URLs de preview
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviewUrls(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remover imagem selecionada
  const removeSelectedImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // Remover imagem existente
  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  // Upload de imagens
  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) {
      return existingImages;
    }

    setUploadingImages(true);
    
    try {
      const formData = new FormData();
      selectedImages.forEach(file => {
        formData.append('images', file);
      });

      const response = await fetch('/api/upload/product-images', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro no upload das imagens');
      }

      const data: ImageUploadResponse = await response.json();
      return [...existingImages, ...data.imageUrls];
    } catch (error) {
      console.error('Erro no upload:', error);
      toast({
        title: "Erro no upload",
        description: "Não foi possível fazer upload das imagens",
        variant: "destructive"
      });
      throw error;
    } finally {
      setUploadingImages(false);
    }
  };

  // Submeter formulário
  const onFormSubmit = async (data: ProductFormData) => {
    try {
      const imageUrls = await uploadImages();
      await onSubmit({
        ...data,
        images: imageUrls
      });
    } catch (error) {
      // Erro já tratado no uploadImages
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {product ? 'Editar Produto' : 'Novo Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Digite o nome do produto"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="slug-do-produto"
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                {...register('price', { valueAsNumber: true })}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Categoria *</Label>
              <Select 
                onValueChange={(value) => setValue('categoryId', value)}
                defaultValue={product?.categoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-sm text-red-500">{errors.categoryId.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Descrição detalhada do produto"
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Upload de imagens */}
          <div className="space-y-4">
            <Label>Imagens do Produto</Label>
            
            {/* Imagens existentes */}
            {existingImages.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Imagens atuais:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Produto ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Novas imagens selecionadas */}
            {imagePreviewUrls.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Novas imagens:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagePreviewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeSelectedImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input de upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-2">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Clique para selecionar imagens ou arraste aqui
                  </p>
                  <p className="text-xs text-gray-500">
                    JPEG, PNG, WebP - Máximo 5MB cada - Até 10 imagens
                  </p>
                </div>
              </label>
            </div>

            <p className="text-xs text-gray-500">
              Total de imagens: {existingImages.length + selectedImages.length}/10
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              {...register('isActive')}
              className="rounded"
            />
            <Label htmlFor="isActive">Produto ativo</Label>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading || uploadingImages}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading || uploadingImages}
            >
              {(isLoading || uploadingImages) && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {uploadingImages ? 'Enviando imagens...' : (product ? 'Atualizar' : 'Criar')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}