---
name: design-patterns-gof
description: Master Gang of Four (GoF) creational, structural, and behavioral design patterns tailored for clean, decoupled software engineering.
---

# Gang of Four (GoF) Design Patterns

Provides structured design recipes to solve recurring software design problems with decoupled, maintainable, and testable code.

## 1. Creational Patterns (Object Creation)

### Factory Method & Abstract Factory
- **Use When**: A system should be independent of how its products are created, or when families of related objects must work together without coupling to concrete classes.
- **Example in POS / Retail**: Multi-payment gateway instantiation (QRIS, Virtual Account, EDC, Cash).
```typescript
interface PaymentGateway {
  charge(amount: number): Promise<PaymentResult>;
}

class PaymentGatewayFactory {
  static create(type: 'QRIS' | 'VA' | 'CASH'): PaymentGateway {
    switch (type) {
      case 'QRIS': return new QrisPaymentGateway();
      case 'VA': return new VirtualAccountGateway();
      case 'CASH': return new CashPaymentGateway();
      default: throw new Error(`Unsupported payment method: ${type}`);
    }
  }
}
```

### Builder Pattern
- **Use When**: Constructing complex objects step-by-step with many optional parameters (e.g., Complex Sales Order with discounts, tax rates, shipping, and multiple line items).

### Singleton Pattern
- **Use When**: Exactly one instance of a class is required to coordinate actions across the system (e.g., Thread-safe DB connection pool or telemetry client).
- **Rule**: Avoid mutable global state singletons; prefer dependency injection.

---

## 2. Structural Patterns (Object Composition)

### Adapter Pattern
- **Use When**: An existing class's interface does not match the one you need. Converts third-party vendor formats (e.g., Midtrans / Xendit webhook payloads) into your internal domain event representation.

### Decorator Pattern
- **Use When**: Adding responsibilities to objects dynamically without modifying underlying classes.
- **Example**: Wrapping HTTP/Repository handlers with caching, distributed tracing, metrics timing, and retry logic.

### Facade Pattern
- **Use When**: Providing a unified, simplified high-level interface to a complex subsystem (e.g., Order Checkout Facade coordinating inventory deduction, payment processing, tax calculation, and receipt generation).

---

## 3. Behavioral Patterns (Object Interaction & State)

### Strategy Pattern
- **Use When**: Defining a family of interchangeable algorithms that can be selected at runtime.
- **Example**: Dynamic Discount Calculation (Percentage Discount, Buy One Get One, Member Tier Discount).
```typescript
interface DiscountStrategy {
  applyDiscount(cart: Cart): number;
}

class MemberDiscountStrategy implements DiscountStrategy {
  applyDiscount(cart: Cart): number {
    return cart.subtotal * 0.10; // 10% member discount
  }
}
```

### Observer / Pub-Sub Pattern
- **Use When**: A change to one object requires updating others without tight coupling.
- **Example**: Domain events (`OrderPaidEvent`) triggering email notifications, warehouse stock dispatch, and analytics events.

### State Pattern
- **Use When**: An object alters its behavior when its internal state changes (e.g., Transaction State: `DRAFT` $\to$ `PENDING_PAYMENT` $\to$ `PAID` $\to$ `REFUNDED`).
