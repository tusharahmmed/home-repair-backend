"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeFields = void 0;
function excludeFields(user, keys) {
    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
exports.excludeFields = excludeFields;
// function main() {
//     const user = await prisma.user.findUnique({ where: 1 })
//     const userWithoutPassword = exclude(user, ['password'])
//   }
