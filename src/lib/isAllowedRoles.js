export function isRoleAllowed(allowedRoles, userRole) {
  const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return allowed.includes(userRole);
}
