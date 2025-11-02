import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertProductSchema, insertCategorySchema, insertUserSchema, insertAddressSchema,
  insertCartItemSchema, insertOrderSchema, insertOrderItemSchema, insertPaymentSchema,
  insertInstallmentSchema, insertInventoryMovementSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ============ CATEGORIES ============
  app.get("/api/categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.listCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req: Request, res: Response) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.post("/api/categories", async (req: Request, res: Response) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ error: "Invalid category data" });
    }
  });

  app.put("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const data = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(req.params.id, data);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: "Invalid category data" });
    }
  });

  app.delete("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const success = await storage.deleteCategory(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  // ============ PRODUCTS ============
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const categoryId = req.query.categoryId as string | undefined;
      const products = await storage.listProducts(categoryId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:slug", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.post("/api/products", async (req: Request, res: Response) => {
    try {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(data);
      
      // Create inventory for the product
      await storage.createInventory({
        productId: product.id,
        quantity: 0,
        minStock: 5,
      });
      
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.put("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const data = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(req.params.id, data);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  app.delete("/api/products/:id", async (req: Request, res: Response) => {
    try {
      const success = await storage.deleteProduct(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // ============ INVENTORY ============
  app.get("/api/inventory", async (_req: Request, res: Response) => {
    try {
      const inventory = await storage.listInventory();
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inventory" });
    }
  });

  app.get("/api/inventory/low-stock", async (_req: Request, res: Response) => {
    try {
      const lowStock = await storage.listLowStock();
      res.json(lowStock);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch low stock items" });
    }
  });

  app.get("/api/inventory/:productId", async (req: Request, res: Response) => {
    try {
      const inventory = await storage.getInventory(req.params.productId);
      if (!inventory) {
        return res.status(404).json({ error: "Inventory not found" });
      }
      res.json(inventory);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inventory" });
    }
  });

  app.put("/api/inventory/:productId", async (req: Request, res: Response) => {
    try {
      const { quantity, minStock } = req.body;
      const inventory = await storage.updateInventory(req.params.productId, {
        quantity,
        minStock,
      });
      if (!inventory) {
        return res.status(404).json({ error: "Inventory not found" });
      }
      res.json(inventory);
    } catch (error) {
      res.status(400).json({ error: "Invalid inventory data" });
    }
  });

  // ============ INVENTORY MOVEMENTS ============
  app.get("/api/inventory-movements", async (req: Request, res: Response) => {
    try {
      const productId = req.query.productId as string | undefined;
      const movements = await storage.listInventoryMovements(productId);
      res.json(movements);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch inventory movements" });
    }
  });

  app.post("/api/inventory-movements", async (req: Request, res: Response) => {
    try {
      const data = insertInventoryMovementSchema.parse(req.body);
      const movement = await storage.createInventoryMovement(data);
      
      // Update inventory quantity
      const quantityChange = data.type === "entry" || data.type === "return" 
        ? data.quantity 
        : -data.quantity;
      await storage.adjustInventory(data.productId, quantityChange);
      
      res.status(201).json(movement);
    } catch (error) {
      res.status(400).json({ error: "Invalid movement data" });
    }
  });

  // ============ USERS ============
  app.get("/api/users", async (_req: Request, res: Response) => {
    try {
      const users = await storage.listUsers();
      // Remove passwords from response
      const sanitizedUsers = users.map(({ password, ...user }) => user);
      res.json(sanitizedUsers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password, ...sanitizedUser } = user;
      res.json(sanitizedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const data = insertUserSchema.parse(req.body);
      // In production, hash the password before storing
      const user = await storage.createUser(data);
      const { password, ...sanitizedUser } = user;
      res.status(201).json(sanitizedUser);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  app.put("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const data = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(req.params.id, data);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const { password, ...sanitizedUser } = user;
      res.json(sanitizedUser);
    } catch (error) {
      res.status(400).json({ error: "Invalid user data" });
    }
  });

  // ============ ADDRESSES ============
  app.get("/api/users/:userId/addresses", async (req: Request, res: Response) => {
    try {
      const addresses = await storage.getUserAddresses(req.params.userId);
      res.json(addresses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch addresses" });
    }
  });

  app.post("/api/addresses", async (req: Request, res: Response) => {
    try {
      const data = insertAddressSchema.parse(req.body);
      const address = await storage.createAddress(data);
      res.status(201).json(address);
    } catch (error) {
      res.status(400).json({ error: "Invalid address data" });
    }
  });

  app.put("/api/addresses/:id", async (req: Request, res: Response) => {
    try {
      const data = insertAddressSchema.partial().parse(req.body);
      const address = await storage.updateAddress(req.params.id, data);
      if (!address) {
        return res.status(404).json({ error: "Address not found" });
      }
      res.json(address);
    } catch (error) {
      res.status(400).json({ error: "Invalid address data" });
    }
  });

  app.delete("/api/addresses/:id", async (req: Request, res: Response) => {
    try {
      const success = await storage.deleteAddress(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Address not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete address" });
    }
  });

  // ============ CART ============
  app.get("/api/cart/:cartId", async (req: Request, res: Response) => {
    try {
      const cart = await storage.getCart(req.params.cartId);
      if (!cart) {
        return res.status(404).json({ error: "Cart not found" });
      }
      const items = await storage.listCartItems(cart.id);
      res.json({ cart, items });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req: Request, res: Response) => {
    try {
      const { userId, sessionId } = req.body;
      const cart = await storage.createCart({ userId, sessionId });
      res.status(201).json(cart);
    } catch (error) {
      res.status(400).json({ error: "Invalid cart data" });
    }
  });

  app.post("/api/cart/:cartId/items", async (req: Request, res: Response) => {
    try {
      const data = insertCartItemSchema.parse({
        ...req.body,
        cartId: req.params.cartId,
      });
      const item = await storage.addCartItem(data);
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid cart item data" });
    }
  });

  app.put("/api/cart-items/:id", async (req: Request, res: Response) => {
    try {
      const { quantity } = req.body;
      const item = await storage.updateCartItem(req.params.id, { quantity });
      if (!item) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid cart item data" });
    }
  });

  app.delete("/api/cart-items/:id", async (req: Request, res: Response) => {
    try {
      const success = await storage.deleteCartItem(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Cart item not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete cart item" });
    }
  });

  app.delete("/api/cart/:cartId/items", async (req: Request, res: Response) => {
    try {
      await storage.clearCart(req.params.cartId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // Calculate cart totals
  app.get("/api/cart/:cartId/totals", async (req: Request, res: Response) => {
    try {
      const items = await storage.listCartItems(req.params.cartId);
      const subtotal = items.reduce((sum, item) => {
        return sum + parseFloat(item.price) * item.quantity;
      }, 0);
      
      // Simple shipping calculation (could be more complex)
      const shippingCost = subtotal > 500 ? 0 : 50;
      const discount = 0; // Could implement discount logic
      const total = subtotal + shippingCost - discount;
      
      res.json({ subtotal, shippingCost, discount, total });
    } catch (error) {
      res.status(500).json({ error: "Failed to calculate totals" });
    }
  });

  // ============ ORDERS ============
  app.get("/api/orders", async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string | undefined;
      const orders = await storage.listOrders(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      const items = await storage.listOrderItems(order.id);
      res.json({ order, items });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const { items } = req.body;
      
      const order = await storage.createOrder(orderData);
      
      // Create order items
      for (const item of items) {
        const itemData = insertOrderItemSchema.parse({
          ...item,
          orderId: order.id,
        });
        await storage.createOrderItem(itemData);
        
        // Decrease inventory
        await storage.adjustInventory(item.productId, -item.quantity);
      }
      
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  app.put("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const data = insertOrderSchema.partial().parse(req.body);
      const order = await storage.updateOrder(req.params.id, data);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  // ============ PAYMENTS ============
  app.get("/api/payments", async (_req: Request, res: Response) => {
    try {
      const payments = await storage.listPayments();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });

  app.get("/api/payments/order/:orderId", async (req: Request, res: Response) => {
    try {
      const payment = await storage.getPaymentByOrderId(req.params.orderId);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      const installments = await storage.listInstallments(payment.id);
      res.json({ payment, installments });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch payment" });
    }
  });

  app.post("/api/payments", async (req: Request, res: Response) => {
    try {
      const paymentData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(paymentData);
      
      // Create installments if > 1
      if (payment.installments > 1) {
        const installmentAmount = parseFloat(payment.amount) / payment.installments;
        for (let i = 1; i <= payment.installments; i++) {
          const dueDate = new Date();
          dueDate.setMonth(dueDate.getMonth() + i);
          
          await storage.createInstallment({
            paymentId: payment.id,
            installmentNumber: i,
            amount: installmentAmount.toFixed(2),
            dueDate,
            status: "pending",
          });
        }
      }
      
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ error: "Invalid payment data" });
    }
  });

  app.put("/api/payments/:id", async (req: Request, res: Response) => {
    try {
      const data = insertPaymentSchema.partial().parse(req.body);
      const payment = await storage.updatePayment(req.params.id, data);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }
      res.json(payment);
    } catch (error) {
      res.status(400).json({ error: "Invalid payment data" });
    }
  });

  // ============ INSTALLMENTS ============
  app.get("/api/installments/:paymentId", async (req: Request, res: Response) => {
    try {
      const installments = await storage.listInstallments(req.params.paymentId);
      res.json(installments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch installments" });
    }
  });

  app.put("/api/installments/:id", async (req: Request, res: Response) => {
    try {
      const data = insertInstallmentSchema.partial().parse(req.body);
      const installment = await storage.updateInstallment(req.params.id, data);
      if (!installment) {
        return res.status(404).json({ error: "Installment not found" });
      }
      res.json(installment);
    } catch (error) {
      res.status(400).json({ error: "Invalid installment data" });
    }
  });

  // ============ ANALYTICS/REPORTS ============
  app.get("/api/analytics/dashboard", async (_req: Request, res: Response) => {
    try {
      const orders = await storage.listOrders();
      const products = await storage.listProducts();
      const users = await storage.listUsers();
      const lowStock = await storage.listLowStock();
      
      const totalRevenue = orders.reduce((sum, order) => {
        return sum + parseFloat(order.total);
      }, 0);
      
      const recentOrders = orders.slice(-10).reverse();
      
      res.json({
        totalOrders: orders.length,
        totalRevenue,
        totalProducts: products.length,
        totalCustomers: users.filter(u => u.role === "customer").length,
        lowStockCount: lowStock.length,
        recentOrders,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  app.get("/api/analytics/sales", async (req: Request, res: Response) => {
    try {
      const { period = "month" } = req.query;
      const orders = await storage.listOrders();
      
      // Simple period filtering (could be enhanced)
      const now = new Date();
      const startDate = new Date();
      if (period === "week") {
        startDate.setDate(now.getDate() - 7);
      } else if (period === "month") {
        startDate.setMonth(now.getMonth() - 1);
      } else if (period === "year") {
        startDate.setFullYear(now.getFullYear() - 1);
      }
      
      const periodOrders = orders.filter(order => 
        new Date(order.createdAt) >= startDate
      );
      
      const totalSales = periodOrders.reduce((sum, order) => {
        return sum + parseFloat(order.total);
      }, 0);
      
      res.json({
        period,
        totalSales,
        orderCount: periodOrders.length,
        orders: periodOrders,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sales analytics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
