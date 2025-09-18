'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const PostSchema = z.object({
    title: z.string({
        invalid_type_error: 'Please enter a title',
    }),
    description: z.string({
        invalid_type_error: 'Please enter a description',
    })
})

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
    };
    message?: string | null;
}

export const createPost = async (prevState: State, formData: FormData) => {
    console.log('Form: ', formData)
    const validatedForm = PostSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description')
    });
    if (!validatedForm.success) {
        console.log(validatedForm.error)
        return {
            errors: validatedForm.error.flatten().fieldErrors,
            message: 'Error parsing form'
        }
    }

    const { title, description } = validatedForm.data;
    const response = await fetch ('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: description
            })
        });

    if (!response.ok) return {
        message: 'Error creating form'
    }

    revalidatePath('/posts')
    redirect('/posts')
}