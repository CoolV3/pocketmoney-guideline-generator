"use client";

import EmptyArticle from "@/components/Article";
import {useState} from "react";
import MarkdownInput from "@/components/MarkdownInput";

export default function GenerateNewArticleComponent() {
    const [MarkdownArticle, setMarkdownArticle] = useState(``)
    const [title, setTitle] = useState("Article Name")
    const [author, setAuthor] = useState("Max Mustermann")
    const [image, setImage] = useState("")

    return(
        <div className="flex flex-col md:flex-row gap-20">
            <div className="flex flex-col justify-center items-center pt-10">
                <h1 className="text-5xl">Generate an new Article</h1>
                <p>Generate an real looking news article.</p>
                <div className="p-10 flex-col flex gap-5">
                    <div>
                        <p>Article Name</p>
                        <input placeholder="Article Name" className="border-2 rounded-2xl p-4 text-lg w-100" onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <MarkdownInput onChange={(e) => setMarkdownArticle(e)}/>
                    <div>
                        <p>Author Name</p>
                        <input type="url" placeholder="Max Mustermann" className="border-2 rounded-2xl p-4 text-lg w-100 " onChange={(e) => setAuthor(e.target.value)}/>
                    </div>
                    <div>
                        <p>Title Image url</p>
                        <input type="url" placeholder="https://..." className="border-2 rounded-2xl p-4 text-lg w-100" onChange={(e) => setImage(e.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="h-screen overflow-y-auto">
                <EmptyArticle markdown={MarkdownArticle} title={title} author={author} imageUrl={image}/>
            </div>
        </div>
    )
}