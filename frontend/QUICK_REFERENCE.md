# Real Property Frontend - Quick Reference

## File Structure

```
frontend/
├── app/
│   ├── (auth)/              # Auth routes (login, register, etc.)
│   ├── (main)/              # Main layout pages
│   ├── (protected)/         # Auth-required routes
│   │   └── dashboard/
│   ├── (ghost)/             # Ghost routes (error pages)
│   └── page.tsx             # Homepage
├── components/
│   ├── auth/                # ProtectedRoute, RoleGate, PermissionGate
│   ├── layout/              # Header, Sidebar, Footer, AppLayout
│   └── ui/                  # shadcn/ui components
├── constants/
│   └── permissions.ts       # RBAC configuration
├── contexts/
│   └── AuthContext.tsx      # Auth state management
├── lib/
│   └── utils.ts             # Utility functions (cn, etc.)
├── middleware.ts            # Route protection middleware
├── tailwind.config.ts       # Design tokens
└── IMPLEMENTATION_GUIDE.md  # Full documentation
```

## Quick Commands

```bash
# Development
npm run dev                  # Start dev server (http://localhost:3000)

# Building & Production
npm run build               # Build for production
npm run start               # Start production server

# Code Quality
npm run lint                # Run ESLint

# Database (when needed)
npm run prisma:migrate:dev  # Create migrations
npm run prisma:studio       # Open Prisma Studio
```

## Common Imports

```typescript
// Auth
import { useAuth } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { RoleGate } from '@/components/auth/RoleGate';
import { PermissionGate } from '@/components/auth/PermissionGate';

// Constants
import { ROLES, PERMISSIONS, hasPermission } from '@/constants/permissions';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Utilities
import { cn } from '@/lib/utils';

// Icons
import { Plus, Edit, Trash, Home, Menu, X } from 'lucide-react';
```

## Common Patterns

### Protected Page with Role Check
```typescript
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { ROLES } from '@/constants/permissions';

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
      <AdminContent />
    </ProtectedRoute>
  );
}

function AdminContent() {
  return <div>Admin Panel</div>;
}
```

### Conditional Rendering Based on Permission
```typescript
'use client';

import { PermissionGate } from '@/components/auth/PermissionGate';
import { PERMISSIONS } from '@/constants/permissions';
import { Button } from '@/components/ui/button';

export function PropertyActions() {
  return (
    <PermissionGate permissions={PERMISSIONS.CREATE_PROPERTY}>
      <Button>Post Property</Button>
    </PermissionGate>
  );
}
```

### Using Auth Hook
```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';

export function UserProfile() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return <p>Not logged in</p>;

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Card Component
```typescript
import { Button } from '@/components/ui/button';

export function PropertyCard({ property }) {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card hover:shadow-card-hover p-6 border border-neutral-200 dark:border-neutral-700">
      <h3 className="text-h3 font-semibold mb-2">{property.title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
        {property.location}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary-700">${property.price}</span>
        <Button variant="ghost" size="sm">View</Button>
      </div>
    </div>
  );
}
```

### Responsive Layout
```typescript
<div className="px-4 md:px-6 lg:px-8">
  <h1 className="text-2xl md:text-h2 lg:text-h1">Title</h1>
  
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Items */}
  </div>
</div>
```

## Color Usage

```typescript
// Primary - Deep Blue (Trust, CTA)
className="bg-primary-700 text-white hover:bg-primary-800"

// Secondary - Emerald (Success, Growth)
className="bg-secondary-600 text-white hover:bg-secondary-700"

// Accent - Orange (Calls-to-action)
className="bg-accent-600 text-white hover:bg-accent-700"

// Neutral - Slate (Text, Backgrounds)
className="text-neutral-700 dark:text-neutral-300"

// With dark mode
className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
```

## Button Variants

```typescript
// Primary (main action)
<Button variant="primary">Save</Button>

// Secondary (alternative)
<Button variant="secondary">Cancel</Button>

// Outline (less emphasis)
<Button variant="outline">Learn More</Button>

// Ghost (minimal)
<Button variant="ghost">Skip</Button>

// Danger
<Button variant="danger">Delete</Button>

// Success
<Button variant="success">Complete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// Full width
<Button fullWidth>Full Width</Button>

// Loading
<Button isLoading={true}>Processing...</Button>
```

## Spacing Classes

```typescript
// Padding
p-2    // 8px
p-4    // 16px
p-6    // 24px

// Margin
m-2    // 8px
m-4    // 16px

// Gap (between children)
gap-2  // 8px
gap-4  // 16px
gap-6  // 24px

// Responsive
px-4 md:px-6 lg:px-8   // Responsive horizontal padding
py-8 md:py-12          // Responsive vertical padding
```

## Typography Classes

```typescript
className="text-h1"   // 40px, bold
className="text-h2"   // 30px, semibold
className="text-h3"   // 24px, semibold
className="text-base" // 16px, normal
className="text-sm"   // 14px, small
className="text-xs"   // 12px, tiny

// Font weight
font-bold      // 700
font-semibold  // 600
font-medium    // 500
```

## Common Styling Patterns

```typescript
// Card
className="bg-white dark:bg-neutral-800 rounded-xl shadow-card p-6 border border-neutral-200 dark:border-neutral-700"

// Section
className="py-16 px-4 md:px-6 bg-white dark:bg-neutral-900"

// Container
className="max-w-6xl mx-auto"

// Flex center
className="flex items-center justify-center"

// Grid responsive
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"

// Hover effect
className="hover:shadow-md transition-shadow duration-normal"

// Text truncate
className="truncate"

// Rounded full (pill)
className="rounded-full"
```

## Routes Reference

### Public Routes
```
/                           Homepage
/properties                 Properties listing
/properties/[id]            Property detail
/requests                   Requests listing
/requests/[id]              Request detail
/agents                     Agents directory
/agents/[id]                Agent profile
/services                   Services directory
/services/[id]              Service provider profile
/map                        Interactive map
/about, /contact, /privacy, /terms    Info pages
/auth/login                 Login
/auth/register              Register
/auth/forgot-password       Forgot password
/auth/verify-otp            OTP verification
```

### Protected Routes (Auth Required)
```
/dashboard                  User dashboard
/dashboard/properties       My properties
/dashboard/properties/new   Create property
/dashboard/properties/[id]/edit   Edit property
/dashboard/requests         My requests
/dashboard/requests/new     Create request
/dashboard/profile          Profile settings
```

### Agent Routes (Agent Role Only)
```
/agent/links                Link management
/agent/links/create         Create link
/agent/properties           Agent properties
/agent/requests             Agent requests
```

### Admin Routes (Admin Role Only)
```
/admin                      Admin dashboard
/admin/users                User management
/admin/properties           Property moderation
/admin/requests             Request moderation
/admin/agents               Agent management
/admin/services             Service provider management
/admin/links                Link monitoring
/admin/payments             Payment records
/admin/logs                 Activity logs
/admin/export               Data export
```

## Environment Setup

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Testing Guidelines

```typescript
// Test auth
describe('Auth', () => {
  it('should protect routes', () => {
    // Use ProtectedRoute
  });
});

// Test permissions
describe('Permissions', () => {
  it('should check permissions', () => {
    // Use hasPermission()
  });
});
```

## Performance Tips

1. Use `next/image` for images
2. Use `dynamic()` for large components
3. Use React Query for data fetching
4. Implement route prefetching
5. Use `useCallback` for event handlers
6. Memoize expensive components

## Accessibility Checklist

- [ ] Color contrast 4.5:1 minimum
- [ ] ARIA labels on icon buttons
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Screen reader tested
- [ ] Form labels associated
- [ ] Alt text on images

## Deployment

```bash
# Build
npm run build

# Test build
npm run start

# Deploy to Vercel
vercel deploy
```

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Auth not persisting | Clear cookies, check AuthProvider wrapper |
| Permissions not working | Verify user.role matches ROLES constant |
| Styling not applying | Clear .next folder, restart dev server |
| Page not accessible | Check middleware.ts route configuration |
| Dark mode not working | Add `dark` class to html element |
