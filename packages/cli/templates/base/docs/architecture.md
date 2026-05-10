# 🏗 Architecture

> Update this document as your architecture takes shape.

---

## 📐 System Overview

(Describe your system at a high level - components, data flow, etc.)

```
[User]
   ↓
[Frontend]
   ↓
[Backend / Services]
   ↓
[Database / Storage]
```

---

## 🧱 Layer Structure

(Define your layers - examples below)

### Presentation Layer
What this layer does. Don't put business logic here.

### Business Logic Layer
Core domain rules.

### Data Layer
Persistence and external APIs.

---

## 🗂 Folder Structure

```
src/
├── (define your structure)
```

---

## 🌊 Data Flow

(Trace through key user flows)

### Example: User opens home screen
```
1. ...
2. ...
3. ...
```

---

## 🚫 Dependency Rules

(Define what can depend on what)

```
✅ Allowed
A → B → C

❌ Not allowed
C → A (circular)
```

---

## 🔐 Security

(API keys, authentication, data privacy)

---

## 📊 Performance Considerations

(Caching, optimization strategies)

---

*Last updated: {{DATE}}*
*Update this file when architecture changes + create an ADR.*
