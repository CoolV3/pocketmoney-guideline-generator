import Image from "next/image";
import CustomMarkdownInterpreter from "@/components/MarkdownInterpretor";

export default function EmptyArticle({markdown, title, author, imageUrl}: {markdown: string, title: string, author: string, imageUrl: string}) {


    const testMarkdown = `# Testmarkdown
Will it work? This is a 
test Will it work? This is a text Will it work? This is a text Will it work? This is a text Will it work? This is a text Will it work? This is a text


### Small Headline

- liste 1
- liste 2`;

    return(
        <div className="text-black flex flex-col pt-5">
            <div className="flex flex-col gap-4 justify-center items-center">
                <h1 className="text-5xl transition-all">{title}</h1>
                {imageUrl != "" && (
                    // only for testing
                    // eslint-disable-next-line @next/next/no-img-element
                <img className="rounded-2xl " width={500} height={500} src={imageUrl} alt={"A Picture with lots of coins on a white Table."}/>
                )}
                <p className="self-start pl-5 text-lg">By {author}</p>
            </div>

            <div className="flex flex-col items-start p-5">
                <CustomMarkdownInterpreter content={markdown}/>
            </div>
        </div>
    )
}