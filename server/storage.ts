import {
  type User, type InsertUser,
  type Address, type InsertAddress,
  type Category, type InsertCategory,
  type Product, type InsertProduct,
  type Inventory, type InsertInventory,
  type InventoryMovement, type InsertInventoryMovement,
  type Cart, type InsertCart,
  type CartItem, type InsertCartItem,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem,
  type Payment, type InsertPayment,
  type Installment, type InsertInstallment,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  listUsers(): Promise<User[]>;

  // Addresses
  getAddress(id: string): Promise<Address | undefined>;
  getUserAddresses(userId: string): Promise<Address[]>;
  createAddress(address: InsertAddress): Promise<Address>;
  updateAddress(id: string, address: Partial<InsertAddress>): Promise<Address | undefined>;
  deleteAddress(id: string): Promise<boolean>;

  // Categories
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  listCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;

  // Products
  getProduct(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  listProducts(categoryId?: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;

  // Inventory
  getInventory(productId: string): Promise<Inventory | undefined>;
  listInventory(): Promise<Inventory[]>;
  listLowStock(): Promise<Inventory[]>;
  createInventory(inventory: InsertInventory): Promise<Inventory>;
  updateInventory(productId: string, inventory: Partial<InsertInventory>): Promise<Inventory | undefined>;
  adjustInventory(productId: string, quantity: number): Promise<Inventory | undefined>;

  // Inventory Movements
  getInventoryMovement(id: string): Promise<InventoryMovement | undefined>;
  listInventoryMovements(productId?: string): Promise<InventoryMovement[]>;
  createInventoryMovement(movement: InsertInventoryMovement): Promise<InventoryMovement>;

  // Cart
  getCart(id: string): Promise<Cart | undefined>;
  getCartByUserId(userId: string): Promise<Cart | undefined>;
  getCartBySessionId(sessionId: string): Promise<Cart | undefined>;
  createCart(cart: InsertCart): Promise<Cart>;
  deleteCart(id: string): Promise<boolean>;

  // Cart Items
  getCartItem(id: string): Promise<CartItem | undefined>;
  listCartItems(cartId: string): Promise<CartItem[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: string, item: Partial<InsertCartItem>): Promise<CartItem | undefined>;
  deleteCartItem(id: string): Promise<boolean>;
  clearCart(cartId: string): Promise<boolean>;

  // Orders
  getOrder(id: string): Promise<Order | undefined>;
  listOrders(userId?: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, order: Partial<InsertOrder>): Promise<Order | undefined>;
  deleteOrder(id: string): Promise<boolean>;

  // Order Items
  getOrderItem(id: string): Promise<OrderItem | undefined>;
  listOrderItems(orderId: string): Promise<OrderItem[]>;
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;

  // Payments
  getPayment(id: string): Promise<Payment | undefined>;
  getPaymentByOrderId(orderId: string): Promise<Payment | undefined>;
  listPayments(): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment | undefined>;

  // Installments
  getInstallment(id: string): Promise<Installment | undefined>;
  listInstallments(paymentId: string): Promise<Installment[]>;
  createInstallment(installment: InsertInstallment): Promise<Installment>;
  updateInstallment(id: string, installment: Partial<InsertInstallment>): Promise<Installment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private addresses: Map<string, Address>;
  private categories: Map<string, Category>;
  private products: Map<string, Product>;
  private inventory: Map<string, Inventory>;
  private inventoryMovements: Map<string, InventoryMovement>;
  private carts: Map<string, Cart>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;
  private orderItems: Map<string, OrderItem>;
  private payments: Map<string, Payment>;
  private installments: Map<string, Installment>;

  constructor() {
    this.users = new Map();
    this.addresses = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.inventory = new Map();
    this.inventoryMovements = new Map();
    this.carts = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.payments = new Map();
    this.installments = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      id,
      name: insertUser.name,
      email: insertUser.email,
      password: insertUser.password,
      phone: insertUser.phone ?? null,
      role: insertUser.role ?? "customer",
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Addresses
  async getAddress(id: string): Promise<Address | undefined> {
    return this.addresses.get(id);
  }

  async getUserAddresses(userId: string): Promise<Address[]> {
    return Array.from(this.addresses.values()).filter(addr => addr.userId === userId);
  }

  async createAddress(insertAddress: InsertAddress): Promise<Address> {
    const id = randomUUID();
    const address: Address = {
      id,
      userId: insertAddress.userId,
      street: insertAddress.street,
      number: insertAddress.number,
      complement: insertAddress.complement ?? null,
      neighborhood: insertAddress.neighborhood,
      city: insertAddress.city,
      state: insertAddress.state,
      zipCode: insertAddress.zipCode,
      isDefault: insertAddress.isDefault ?? false,
      createdAt: new Date(),
    };
    this.addresses.set(id, address);
    return address;
  }

  async updateAddress(id: string, updates: Partial<InsertAddress>): Promise<Address | undefined> {
    const address = this.addresses.get(id);
    if (!address) return undefined;
    const updated = { ...address, ...updates };
    this.addresses.set(id, updated);
    return updated;
  }

  async deleteAddress(id: string): Promise<boolean> {
    return this.addresses.delete(id);
  }

  // Categories
  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async listCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = {
      id,
      name: insertCategory.name,
      slug: insertCategory.slug,
      description: insertCategory.description ?? null,
      createdAt: new Date(),
    };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: string, updates: Partial<InsertCategory>): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    const updated = { ...category, ...updates };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.categories.delete(id);
  }

  // Products
  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(prod => prod.slug === slug);
  }

  async listProducts(categoryId?: string): Promise<Product[]> {
    const products = Array.from(this.products.values());
    if (categoryId) {
      return products.filter(prod => prod.categoryId === categoryId);
    }
    return products;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      id,
      categoryId: insertProduct.categoryId,
      name: insertProduct.name,
      slug: insertProduct.slug,
      description: insertProduct.description ?? null,
      price: insertProduct.price,
      originalPrice: insertProduct.originalPrice ?? null,
      images: insertProduct.images ?? [],
      sku: insertProduct.sku ?? null,
      isActive: insertProduct.isActive ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    const updated = { ...product, ...updates, updatedAt: new Date() };
    this.products.set(id, updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }

  // Inventory
  async getInventory(productId: string): Promise<Inventory | undefined> {
    return Array.from(this.inventory.values()).find(inv => inv.productId === productId);
  }

  async listInventory(): Promise<Inventory[]> {
    return Array.from(this.inventory.values());
  }

  async listLowStock(): Promise<Inventory[]> {
    return Array.from(this.inventory.values()).filter(inv => inv.quantity <= inv.minStock);
  }

  async createInventory(insertInventory: InsertInventory): Promise<Inventory> {
    const id = randomUUID();
    const inventory: Inventory = {
      id,
      productId: insertInventory.productId,
      quantity: insertInventory.quantity ?? 0,
      minStock: insertInventory.minStock ?? 5,
      updatedAt: new Date(),
    };
    this.inventory.set(id, inventory);
    return inventory;
  }

  async updateInventory(productId: string, updates: Partial<InsertInventory>): Promise<Inventory | undefined> {
    const inv = await this.getInventory(productId);
    if (!inv) return undefined;
    const updated = { ...inv, ...updates, updatedAt: new Date() };
    this.inventory.set(inv.id, updated);
    return updated;
  }

  async adjustInventory(productId: string, quantity: number): Promise<Inventory | undefined> {
    const inv = await this.getInventory(productId);
    if (!inv) return undefined;
    const updated = { ...inv, quantity: inv.quantity + quantity, updatedAt: new Date() };
    this.inventory.set(inv.id, updated);
    return updated;
  }

  // Inventory Movements
  async getInventoryMovement(id: string): Promise<InventoryMovement | undefined> {
    return this.inventoryMovements.get(id);
  }

  async listInventoryMovements(productId?: string): Promise<InventoryMovement[]> {
    const movements = Array.from(this.inventoryMovements.values());
    if (productId) {
      return movements.filter(mov => mov.productId === productId);
    }
    return movements;
  }

  async createInventoryMovement(insertMovement: InsertInventoryMovement): Promise<InventoryMovement> {
    const id = randomUUID();
    const movement: InventoryMovement = {
      id,
      productId: insertMovement.productId,
      type: insertMovement.type,
      quantity: insertMovement.quantity,
      note: insertMovement.note ?? null,
      createdBy: insertMovement.createdBy ?? null,
      createdAt: new Date(),
    };
    this.inventoryMovements.set(id, movement);
    return movement;
  }

  // Cart
  async getCart(id: string): Promise<Cart | undefined> {
    return this.carts.get(id);
  }

  async getCartByUserId(userId: string): Promise<Cart | undefined> {
    return Array.from(this.carts.values()).find(cart => cart.userId === userId);
  }

  async getCartBySessionId(sessionId: string): Promise<Cart | undefined> {
    return Array.from(this.carts.values()).find(cart => cart.sessionId === sessionId);
  }

  async createCart(insertCart: InsertCart): Promise<Cart> {
    const id = randomUUID();
    const cart: Cart = {
      id,
      userId: insertCart.userId ?? null,
      sessionId: insertCart.sessionId ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.carts.set(id, cart);
    return cart;
  }

  async deleteCart(id: string): Promise<boolean> {
    return this.carts.delete(id);
  }

  // Cart Items
  async getCartItem(id: string): Promise<CartItem | undefined> {
    return this.cartItems.get(id);
  }

  async listCartItems(cartId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.cartId === cartId);
  }

  async addCartItem(insertItem: InsertCartItem): Promise<CartItem> {
    const id = randomUUID();
    const item: CartItem = {
      id,
      cartId: insertItem.cartId,
      productId: insertItem.productId,
      quantity: insertItem.quantity ?? 1,
      price: insertItem.price,
      createdAt: new Date(),
    };
    this.cartItems.set(id, item);
    return item;
  }

  async updateCartItem(id: string, updates: Partial<InsertCartItem>): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;
    const updated = { ...item, ...updates };
    this.cartItems.set(id, updated);
    return updated;
  }

  async deleteCartItem(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(cartId: string): Promise<boolean> {
    const items = await this.listCartItems(cartId);
    items.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  // Orders
  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async listOrders(userId?: string): Promise<Order[]> {
    const orders = Array.from(this.orders.values());
    if (userId) {
      return orders.filter(order => order.userId === userId);
    }
    return orders;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      id,
      userId: insertOrder.userId,
      addressId: insertOrder.addressId,
      status: insertOrder.status ?? "pending",
      subtotal: insertOrder.subtotal,
      shippingCost: insertOrder.shippingCost ?? "0",
      discount: insertOrder.discount ?? "0",
      total: insertOrder.total,
      notes: insertOrder.notes ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, updates: Partial<InsertOrder>): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    const updated = { ...order, ...updates, updatedAt: new Date() };
    this.orders.set(id, updated);
    return updated;
  }

  async deleteOrder(id: string): Promise<boolean> {
    return this.orders.delete(id);
  }

  // Order Items
  async getOrderItem(id: string): Promise<OrderItem | undefined> {
    return this.orderItems.get(id);
  }

  async listOrderItems(orderId: string): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(item => item.orderId === orderId);
  }

  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const item: OrderItem = {
      ...insertItem,
      id,
    };
    this.orderItems.set(id, item);
    return item;
  }

  // Payments
  async getPayment(id: string): Promise<Payment | undefined> {
    return this.payments.get(id);
  }

  async getPaymentByOrderId(orderId: string): Promise<Payment | undefined> {
    return Array.from(this.payments.values()).find(payment => payment.orderId === orderId);
  }

  async listPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values());
  }

  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = {
      id,
      orderId: insertPayment.orderId,
      amount: insertPayment.amount,
      status: insertPayment.status ?? "pending",
      method: insertPayment.method,
      installments: insertPayment.installments ?? 1,
      transactionId: insertPayment.transactionId ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.payments.set(id, payment);
    return payment;
  }

  async updatePayment(id: string, updates: Partial<InsertPayment>): Promise<Payment | undefined> {
    const payment = this.payments.get(id);
    if (!payment) return undefined;
    const updated = { ...payment, ...updates, updatedAt: new Date() };
    this.payments.set(id, updated);
    return updated;
  }

  // Installments
  async getInstallment(id: string): Promise<Installment | undefined> {
    return this.installments.get(id);
  }

  async listInstallments(paymentId: string): Promise<Installment[]> {
    return Array.from(this.installments.values()).filter(inst => inst.paymentId === paymentId);
  }

  async createInstallment(insertInstallment: InsertInstallment): Promise<Installment> {
    const id = randomUUID();
    const installment: Installment = {
      id,
      paymentId: insertInstallment.paymentId,
      installmentNumber: insertInstallment.installmentNumber,
      amount: insertInstallment.amount,
      dueDate: insertInstallment.dueDate,
      paidAt: insertInstallment.paidAt ?? null,
      status: insertInstallment.status ?? "pending",
    };
    this.installments.set(id, installment);
    return installment;
  }

  async updateInstallment(id: string, updates: Partial<InsertInstallment>): Promise<Installment | undefined> {
    const installment = this.installments.get(id);
    if (!installment) return undefined;
    const updated = { ...installment, ...updates };
    this.installments.set(id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
