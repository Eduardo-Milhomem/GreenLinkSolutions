import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';

// Criar diretório de uploads se não existir
const uploadsDir = path.join(process.cwd(), 'uploads', 'products');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuração do multer para armazenamento temporário
const storage = multer.memoryStorage();

// Filtro para aceitar apenas imagens
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não suportado. Use apenas JPEG, PNG ou WebP.'));
  }
};

// Configuração do multer
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB por arquivo
    files: 10 // Máximo 10 arquivos por upload
  }
});

// Middleware para processar e otimizar imagens
export const processImages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return next();
    }

    const processedImages: string[] = [];

    for (const file of req.files) {
      const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.webp`;
      const filepath = path.join(uploadsDir, filename);

      // Processar e otimizar imagem com sharp
      await sharp(file.buffer)
        .resize(800, 600, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: 85 })
        .toFile(filepath);

      // Criar thumbnail
      const thumbnailFilename = `thumb-${filename}`;
      const thumbnailPath = path.join(uploadsDir, thumbnailFilename);
      
      await sharp(file.buffer)
        .resize(200, 150, { 
          fit: 'cover' 
        })
        .webp({ quality: 80 })
        .toFile(thumbnailPath);

      processedImages.push(filename);
    }

    // Adicionar URLs das imagens processadas ao request
    req.body.imageUrls = processedImages.map(filename => `/uploads/products/${filename}`);
    req.body.thumbnailUrls = processedImages.map(filename => `/uploads/products/thumb-${filename}`);

    next();
  } catch (error) {
    console.error('Erro ao processar imagens:', error);
    res.status(500).json({ 
      error: 'Erro ao processar imagens',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
};

// Middleware para deletar imagens
export const deleteImages = (imageUrls: string[]) => {
  imageUrls.forEach(url => {
    const filename = path.basename(url);
    const filepath = path.join(uploadsDir, filename);
    const thumbnailPath = path.join(uploadsDir, `thumb-${filename}`);
    
    // Deletar imagem principal
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    
    // Deletar thumbnail
    if (fs.existsSync(thumbnailPath)) {
      fs.unlinkSync(thumbnailPath);
    }
  });
};

// Middleware para servir arquivos estáticos
export const serveUploads = (req: Request, res: Response, next: NextFunction) => {
  const filePath = path.join(uploadsDir, req.params.filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: 'Imagem não encontrada' });
  }
};