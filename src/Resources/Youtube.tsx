import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import moderndayjamesProfile from "../assets/youtubers/moderndayjames.jpg";
import grayTemp from "../assets/grayTemp.jpg";

type YoutubeCardProps = {
    title: string;
    recommend: string;
    profileSrc: string;
    youtubeLink: string;
    atHandle: string;
    content: React.ReactNode;
};

const YoutubeCard = ({
    title,
    atHandle,
    recommend,
    profileSrc,
    youtubeLink,
    content,
}: YoutubeCardProps) => {
    return (
        <Card className="w-[24rem]">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src={profileSrc}
                            onError={(e) => (e.currentTarget.src = grayTemp)}
                            onClick={() => window.open(youtubeLink, "_blank")}
                            className="w-8 h-8 rounded-lg cursor-pointer"
                        />

                        <div>
                            <div>{title}</div>
                            <div className="text-sm text-muted-foreground">
                                {atHandle}
                            </div>
                        </div>
                    </div>

                    <Badge variant="outline" className="ml-4 h-6">
                        {recommend}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>{content}</CardContent>
        </Card>
    );
};

const youtubers: YoutubeCardProps[] = [
    {
        title: "moderndayjames",
        atHandle: "@moderndayjames",
        recommend: "highly",
        youtubeLink: "https://www.youtube.com/@ModernDayJames",
        profileSrc: moderndayjamesProfile,
        content: (
            <div className="flex gap-4 flex-wrap">
                <img
                    src="https://i.ytimg.com/vi/nAlCyQqEZSU/maxresdefault.jpg"
                    className="w-80 rounded-lg cursor-pointer"
                    onClick={() =>
                        window.open(
                            "https://www.youtube.com/watch?v=nAlCyQqEZSU&list=PLgKJMTFp_25iQVZ6ItpZKTSN9Yo44YSTs&index=6",
                            "_blank"
                        )
                    }
                />
                <div>
                    Understanding Perspective{" "}
                    <div className="text-sm text-muted-foreground">
                        Playlist
                    </div>
                </div>
            </div>
        ),
    },
    {
        title: "Uncomfortable",
        atHandle: "@Uncomfortable",
        recommend: "highly",
        youtubeLink: "https://www.youtube.com/@Uncomfortable",
        profileSrc:
            "https://yt3.googleusercontent.com/ytc/APkrFKYDxI1h-2II9L9EsCXxwI2MaPyo77x45n9vcwF54A=s176-c-k-c0x00ffffff-no-rj",
        content: <div>nothing</div>,
    },
    {
        title: "Dan Beardshaw",
        atHandle: "@DanBeardshaw",
        recommend: "Fairly",
        youtubeLink: "https://www.youtube.com/@DanBeardshaw",
        profileSrc:
            "https://yt3.googleusercontent.com/ytc/APkrFKZdLm_Zzrza0nMKhKrWDKSHaPmwEgn9LYcSD_eOZA=s176-c-k-c0x00ffffff-no-rj",
        content: (
            <div>
                {" "}
                good video showing how to draw using boxes
                {/* <p>https://www.youtube.com/watch?v=j9Z3mK6NSUU</p>2 videos about
                rotating boxes
                <p>
                    https://www.youtube.com/watch?v=ja4W5P7K5PE&list=PL7xvYrkzD7N9UUEn_o15wrXZ1Z6lM9t0S
                </p>
                <p>
                    https://www.youtube.com/watch?v=ja4W5P7K5PE&list=PL7xvYrkzD7N9UUEn_o15wrXZ1Z6lM9t0S&index=9
                </p> */}
            </div>
        ),
    },
];

export default function Youtube() {
    return (
        <div className="flex p-0 gap-4 mt-8 flex-wrap justify-center md:justify-start ">
            {youtubers.map((user, index) => (
                <YoutubeCard
                    key={index}
                    title={user.title}
                    recommend={user.recommend}
                    profileSrc={user.profileSrc}
                    youtubeLink={user.youtubeLink}
                    atHandle={user.atHandle}
                    content={user.content}
                />
            ))}
        </div>
    );
}
