'use server'; // adding materi 12 // react comp
 
import { z } from 'zod'; // Zod, a TypeScript-first validation library

// Inserting the data into your database - 01
import { sql } from '@vercel/postgres';

// Revalidate and redirect
import { revalidatePath } from 'next/cache'; 
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100; // Storing values in cents

    const date = new Date().toISOString().split('T')[0]; // Creating new dates

    // Inserting the data into your database - 02
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    // Revalidate and redirect
    revalidatePath('/dashboard/invoices'); 
    redirect('/dashboard/invoices');
}