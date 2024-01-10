'use server'; // adding materi 12 // react comp
 
import { z } from 'zod'; // Zod, a TypeScript-first validation library

// Inserting the data into your database - 01
import { sql } from '@vercel/postgres';

// Revalidate and redirect
import { revalidatePath } from 'next/cache'; 
import { redirect } from 'next/navigation';
 
// adding materi 12 // creating
/*
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
*/

// adding materi 12 and materi 14
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string({
        invalid_type_error: 'Please select a customer.',
    }),
    amount: z.coerce
        .number()
        .gt(0, { message: 'Please enter an amount greater than $0.' }),
    status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
    }),
    date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });

// adding materi 12 // updating
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
};


/* adding materi 12 // creating
export async function createInvoice(formData: FormData) {
*/
    
// adding materi 12 and materi 14
export async function createInvoice(prevState: State, formData: FormData) {

    // adding materi 14 // Improving Accessibility
    // Validate form using Zod
    const validatedFields = CreateInvoice.safeParse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100; // Storing values in cents
    const date = new Date().toISOString().split('T')[0]; // Creating new dates

    // Inserting the data into your database - 02
    // Adding materi 13 // handling error
    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch(error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    // Revalidate and redirect
    revalidatePath('/dashboard/invoices'); 
    redirect('/dashboard/invoices');
}

// adding materi 12 // updating
export async function updateInvoice(id: string, formData: FormData) {
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    // Adding materi 13 // handling error
    try {
        await sql`
            UPDATE invoices
            SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
            WHERE id = ${id}
        `;
    } catch(error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {

    // Adding materi 13 // handling error
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
    } catch(error) {
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }
    
    revalidatePath('/dashboard/invoices');
}