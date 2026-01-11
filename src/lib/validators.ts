import { z } from "zod";

export const contactSchema = z.object({
  cafe: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(5),
  locale: z.string().min(2),
});
