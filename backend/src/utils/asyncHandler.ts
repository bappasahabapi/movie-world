export const asyncHandler =
  <T extends (...args: any[]) => Promise<any>>(fn: T) =>
  (req: any, res: any, next: any) =>
    fn(req, res, next).catch(next);
