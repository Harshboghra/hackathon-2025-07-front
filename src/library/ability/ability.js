import { createMongoAbility,AbilityBuilder } from '@casl/ability';

export const ability = new createMongoAbility();

export function convertAbility(data) {
  const { can, rules } = new AbilityBuilder();
 
  data.forEach((role) => {
    const permissions = role?.role?.role_has_permissions;
    if (!Array.isArray(permissions) || permissions.length === 0) return;

    permissions.forEach((rule) => {
      const action = rule?.permission?.page_action?.code;
      const page = rule?.permission?.page?.code;
      if (action && page) can(action, page); // Only call 'can' if both are defined
    });
  });


  return rules;
}

export function updateAbility(data) {
  if (Array.isArray(data)) {
    const rules = convertAbility(data);
    ability.update(rules);
  }
}
