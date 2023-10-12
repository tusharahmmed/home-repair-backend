export function excludeFields<T, Key extends keyof T>(
  user: T,
  keys: Key[]
): Omit<T, Key> | { [k: string]: unknown } {
  return Object.fromEntries(
    Object.entries(user as any).filter(([key]) => !keys.includes(key as Key))
  );
}

// function main() {
//     const user = await prisma.user.findUnique({ where: 1 })
//     const userWithoutPassword = exclude(user, ['password'])
//   }
