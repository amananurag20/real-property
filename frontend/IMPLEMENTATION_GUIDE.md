# Real Property Frontend - Implementation Guide

## Overview
This document outlines the modern UI redesign and role-based access control system implemented in the Real Property frontend. The system provides a crisp, clear, mobile-responsive interface with comprehensive authorization.

## Phase 1: Foundation & Route Protection ✅ COMPLETED

### 1. Permission Constants & RBAC
**File**: `constants/permissions.ts`

Provides:
- `PERMISSIONS` - All available permissions (browse, create, edit, delete, moderate, etc.)
- `ROLES` - User roles (VISITOR, USER, AGENT, SERVICE_PROVIDER, OWNER, TENANT, ADMIN)
- `ROLE_PERMISSIONS` - Role-to-permission mapping
- `ROUTE_ACCESS` - Route access configuration (PUBLIC, PROTECTED, AGENT_ONLY, ADMIN_ONLY)
- Helper functions: `hasPermission()`, `hasAnyPermission()`, `hasAllPermissions()`, `hasRole()`

### 2. Authentication Context
**File**: `contexts/AuthContext.tsx`

Features:
- User state management
- Login/logout/register methods
- Permission checking methods
- Token management via cookies
- Automatic auth initialization

**Usage**:
```typescript
const { user, isAuthenticated, login, logout, hasPermission } = useAuth();

// Check permissions
if (user?.hasPermission(PERMISSIONS.CREATE_PROPERTY)) {
  // Show create property button
}
```

### 3. Route Middleware
**File**: `middleware.ts`

Enforces:
- Public route access without authentication
- Protected route redirection to login
- Role-specific route guards (admin, agent, provider)
- Token validation
- Auto-redirect authenticated users away from auth pages

### 4. Auth Components
**Files**:
- `components/auth/ProtectedRoute.tsx` - Wrapper for protected pages
- `components/auth/RoleGate.tsx` - Conditional rendering by role
- `components/auth/PermissionGate.tsx` - Conditional rendering by permission

**Usage**:
```typescript
// Protect entire page with role
<ProtectedRoute requiredRoles={[ROLES.ADMIN]}>
  <AdminDashboard />
</ProtectedRoute>

// Conditional UI by role
<RoleGate requiredRoles={ROLES.AGENT}>
  <AgentOnlyFeature />
</RoleGate>

// Conditional UI by permission
<PermissionGate permissions={PERMISSIONS.CREATE_PROPERTY}>
  <CreatePropertyButton />
</PermissionGate>
```

## Phase 2: Design System ✅ COMPLETED

### Tailwind Configuration
**File**: `tailwind.config.ts`

**Colors**:
- Primary: Deep Blue (#1e40af) - `primary-*`
- Secondary: Emerald (#10b981) - `secondary-*`
- Accent: Orange (#f97316) - `accent-*`
- Neutral: Slate (#334155) - `neutral-*`

Each with 50-900 shades for flexibility.

**Typography**:
- H1: 2.5rem / 40px (headings)
- H2: 1.875rem / 30px (section titles)
- H3: 1.5rem / 24px (card titles)
- Base: 1rem / 16px (body text)
- Small: 0.875rem / 14px (metadata)

**Spacing**: 4px base unit (1 = 4px, 2 = 8px, etc.)

**Border Radius**: sm (6px), md (8px), lg (12px), xl (16px), full (9999px)

**Shadows**: xs, sm, md, lg, xl with card variants

### Responsive Breakpoints
- Mobile: 320px+ (default)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Animation
- Fade-in: 200ms ease-out
- Scale-in: 200ms ease-out
- Transitions: fast (150ms), normal (200ms), slow (300ms)

## Phase 3: UI Components ✅ COMPLETED

### shadcn/ui Components
Pre-built components available in `components/ui/`:
- Button, Card, Input, Textarea, Label
- Dialog, AlertDialog, Drawer, Sheet
- Tabs, Accordion, Dropdown Menu
- Badge, Avatar, Spinner, Skeleton
- Form, Select, Checkbox, Radio, Switch
- Breadcrumb, Pagination
- Sonner (toast notifications)

**Example Button Usage**:
```typescript
<Button variant="primary" size="lg" fullWidth>
  Create Property
</Button>

<Button variant="outline" size="sm" isLoading={loading}>
  Save
</Button>
```

## Phase 4: Page Implementation ✅ COMPLETED

### Public Pages
- Homepage (`app/page.tsx`)
- Properties listing
- Property detail
- Requests listing
- Agents directory
- Services directory
- Interactive map
- About, Contact, Privacy, Terms

### Protected Pages (Require Auth)
- Dashboard (`app/(protected)/dashboard/page.tsx`)
- My Properties
- My Requests
- Profile management

### Role-Based Pages
**Agent Only**:
- Link management
- Agent properties
- Agent requests

**Admin Only**:
- Admin dashboard
- User management
- Property moderation
- Request moderation
- Analytics & export

## Usage Examples

### 1. Creating a Protected Page

```typescript
// app/(protected)/my-page/page.tsx
'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';

export default function MyPage() {
  return (
    <ProtectedRoute requiredRoles={['USER', 'AGENT']}>
      <MyPageContent />
    </ProtectedRoute>
  );
}

function MyPageContent() {
  const { user } = useAuth();
  return <h1>Welcome, {user?.name}!</h1>;
}
```

### 2. Conditional UI Based on Permissions

```typescript
import { PermissionGate } from '@/components/auth/PermissionGate';
import { PERMISSIONS } from '@/constants/permissions';

export function PropertyActions() {
  return (
    <>
      <PermissionGate permissions={PERMISSIONS.CREATE_PROPERTY}>
        <Button variant="primary">Post Property</Button>
      </PermissionGate>

      <PermissionGate 
        permissions={[PERMISSIONS.EDIT_OWN_PROPERTY, PERMISSIONS.DELETE_OWN_PROPERTY]}
        requireAll={true}
      >
        <Button variant="outline">Edit & Delete</Button>
      </PermissionGate>
    </>
  );
}
```

### 3. Using Auth Hooks

```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { ROLES, PERMISSIONS } from '@/constants/permissions';

export function UserMenu() {
  const { 
    user, 
    isAuthenticated, 
    hasPermission, 
    hasRole, 
    logout 
  } = useAuth();

  if (!isAuthenticated) {
    return <LoginButton />;
  }

  return (
    <div>
      <p>Hello, {user?.name}</p>
      
      {hasRole(ROLES.ADMIN) && <AdminLink />}
      
      {hasPermission(PERMISSIONS.CREATE_PROPERTY) && <PostPropertyButton />}
      
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 4. Building a Modern Card Component

```typescript
// components/PropertyCard.tsx
export function PropertyCard({ property }) {
  const { hasPermission } = useAuth();
  const canEdit = hasPermission(PERMISSIONS.EDIT_OWN_PROPERTY);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-card hover:shadow-card-hover transition-shadow p-6 border border-neutral-200 dark:border-neutral-700">
      <div className="bg-gradient-to-br from-primary-200 to-secondary-200 h-48 rounded-lg mb-4" />
      
      <h3 className="text-h3 font-semibold text-neutral-900 dark:text-white mb-2">
        {property.title}
      </h3>
      
      <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4">
        {property.location}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary-700 dark:text-primary-400">
          ${property.price}
        </span>
        
        {canEdit && (
          <Button variant="ghost" size="sm">Edit</Button>
        )}
      </div>
    </div>
  );
}
```

## Mobile Responsiveness

All components follow mobile-first design:

```typescript
// Example: Responsive grid
<div className="grid md:grid-cols-3 gap-4">
  {/* Single column on mobile, 3 columns on md+ */}
</div>

// Example: Responsive typography
<h1 className="text-2xl md:text-h2 lg:text-h1">
  Responsive heading
</h1>

// Example: Responsive padding
<section className="px-4 md:px-6 lg:px-8 py-8 md:py-12">
  Content with responsive spacing
</section>
```

## Dark Mode Support

All components support dark mode via `dark:` prefix:

```typescript
<div className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white">
  Content with dark mode support
</div>
```

Enable dark mode in HTML:
```html
<html class="dark">
```

## Next Steps

1. **Complete Protected Pages**: Implement all dashboard pages with data binding
2. **API Integration**: Connect to backend endpoints for CRUD operations
3. **Form Handling**: Use react-hook-form for property/request forms
4. **Data Fetching**: Integrate @tanstack/react-query for data management
5. **Testing**: Add unit and e2e tests with Jest and Playwright
6. **Performance**: Implement image optimization and code splitting
7. **Accessibility**: Run WCAG 2.1 AA compliance audit
8. **Analytics**: Integrate analytics tracking

## Important Notes

### Security
- All permission checks are frontend-only for UX; backend must validate permissions
- Never trust client-side authorization alone
- Always validate on API endpoints
- Tokens should be HTTP-only cookies (handled by backend)

### Performance
- Use dynamic imports for large components
- Implement route prefetching
- Optimize images with Next.js Image component
- Use React Query for efficient data fetching

### Accessibility
- Maintain 4.5:1 color contrast ratio
- Include ARIA labels for icon-only buttons
- Test with keyboard navigation
- Test with screen readers

## Troubleshooting

### Auth not persisting
- Check if AuthProvider wraps the entire app
- Verify JWT token is in cookies
- Check browser cookie settings

### Permissions not working
- Ensure user.role matches ROLES constants
- Verify role exists in ROLE_PERMISSIONS mapping
- Check that roles are set correctly from backend

### Styling not applying
- Clear `.next` build cache
- Restart dev server
- Verify tailwind.config.ts is correct
- Check for conflicting CSS

## Contact & Support

For issues or questions about the implementation, refer to:
- Architecture guide: `frontend-architecture.txt`
- Tech stack guide: `instructions.txt`
