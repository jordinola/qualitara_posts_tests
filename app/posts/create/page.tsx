'use client'

import Link from "next/link"
import { useActionState } from "react"
import { createPost, State } from "../../lib/action"

const CreatePost = () => {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createPost, initialState);

    return (
        <div className="flex flex-col p-6 items-center">
            <h1 className="text-2xl">Add a Post</h1>

            <form action={formAction} className="flex flex-col w-2xl">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" className="bg-white text-black"></input>
                <div>
                    {
                        state.errors?.title &&
                        state.errors?.title.map((error: string) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))
                    }
                </div>

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" className="bg-white text-black"></textarea>
                <div>
                    {
                        state.errors?.description &&
                        state.errors?.description.map((error: string) => (
                            <p key={error} className="text-sm text-red-500">{error}</p>
                        ))
                    }
                </div>

                <div>
                    {
                        state.message &&
                        (
                            <p key={state.message} className="text-sm text-red-500">{state.message}</p>
                        )
                    }
                </div>
                
                <div className="flex mt-6 justify-center gap-4">
                    <Link href='/posts' className="bg-gray-500 rounded-lg px-2 min-w-3lg">Cancel</Link>
                    <button type="submit" className="bg-blue-600 rounded-lg px-2">Create Post</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost