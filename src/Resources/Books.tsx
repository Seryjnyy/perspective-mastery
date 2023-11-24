import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Typography } from "@/components/ui/typographyh3";
import React from "react";

type BookCardProps = {
    title: string;
    author: string;
    recommend: string;
    imgSrc: string;
    desc: string;
};

const BookCard = ({
    title,
    author,
    recommend,
    imgSrc,
    desc,
}: BookCardProps) => {
    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <div>
                        {title}
                        <p className="text-sm text-muted-foreground">
                            by {author}
                        </p>
                    </div>
                    <Badge variant="outline" className="ml-4 h-6">
                        {recommend}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex gap-0 md:gap-8 sm:gap-2 flex-wrap sm:flex-nowrap">
                    <img
                        src={imgSrc}
                        alt={title + " cover."}
                        className="w-64 h-fit rounded-lg"
                    />
                    <div className="w-50 md:w-[20rem] mt-8 ">
                        My opinion: <br /> {desc}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const books: BookCardProps[] = [
    {
        title: "How to draw",
        author: "Scott Robertson",
        recommend: "Highly",
        imgSrc: "https://m.media-amazon.com/images/I/71wjI9q+fFL._AC_UF1000,1000_QL80_.jpg",
        desc: "Great book that can be a little complicated for beginners. Great book that can be a little complicated for beginners. Great book that can be a little complicated for beginners.",
    },
    {
        title: "Figure Drawing: Design and Invention",
        author: "Michael Hampton",
        recommend: "Mildly",
        imgSrc: "https://m.media-amazon.com/images/I/71Nvh-+9+kL._SY466_.jpg",
        desc: "                Focuses on drawing the figure with volume in mind. The beginning part about rhythm etc. can be a lot if your starting off, so you might want to nail your perspective first and try the later parts where it shows the figure using volumes.",
    },
    {
        title: "Constructive Anatomy",
        author: "George B. Bridgman",
        recommend: "Slightly",
        imgSrc: "https://m.media-amazon.com/images/I/91TuFDd48UL._SY466_.jpg",
        desc: "Now this is only here because I want more people to learn from this artist. Its a figure drawing book to show Its a tough book, hard to understand properly especially if starting out it shows how you can further take drawing volumes.",
    },
];

export default function Books() {
    return (
        <div className="flex p-0 gap-4 mt-8 flex-wrap justify-center md:justify-start ">
            {books.map((book, index) => (
                <BookCard
                    key={index}
                    title={book.title}
                    author={book.author}
                    recommend={book.recommend}
                    imgSrc={book.imgSrc}
                    desc={book.desc}
                />
            ))}
        </div>
    );
}
