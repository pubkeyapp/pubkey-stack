import { UserRole, UserStatus } from '@pubkey-stack/sdk'
import { AuthGuard, UserRoleGuard, UserStatusGuard } from '@pubkey-stack/web/auth/data-access'
import { UiError, UiFull, UiLoader, UiWarn } from '@pubkey-stack/web/ui/core'
import { UiLayout } from '@pubkey-stack/web/ui/layout'
import { Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom'

export function useGuardedRoutes({
  admin,
  layout,
  index,
  full,
  root,
}: {
  index: string
  admin: RouteObject[]
  layout: RouteObject[]
  full: RouteObject[]
  root: RouteObject[]
}) {
  return useRoutes([
    { index: true, element: <Navigate to={index} replace /> },
    {
      // This guard makes sure that the user is authenticated
      element: <RouteGuardAuth />,
      children: [
        {
          // This guard makes sure that the user is active
          element: <RouteGuardUserActive />,
          children: [
            {
              // This adds the main layout to the routes
              element: (
                <UiLayout>
                  <Outlet />
                </UiLayout>
              ),
              children: [
                {
                  path: '/admin/*',
                  // This guard makes sure that the user has the admin role
                  element: <RouteGuardUserAdmin />,
                  children: [...admin],
                },
                ...layout,
              ],
            },
            // Here you can add routes that are not part of the main layout
            ...full,
          ],
        },
      ],
    },
    ...root,
  ])
}

function RouteGuardAuth() {
  return (
    <AuthGuard redirectTo="/login" loader={<UiLoader />}>
      <Outlet />
    </AuthGuard>
  )
}

function RouteGuardUserAdmin() {
  const role = UserRole.Admin
  return (
    <UserRoleGuard
      role={role}
      denied={
        <UiFull>
          <UiError message={`You need the ${role} role`} />
        </UiFull>
      }
    />
  )
}

function RouteGuardUserActive() {
  const status = UserStatus.Active
  return (
    <UserStatusGuard
      status={status}
      denied={
        <UiFull>
          <UiWarn message={`Your account is not ${status.toLowerCase()}.`} />
        </UiFull>
      }
    />
  )
}
