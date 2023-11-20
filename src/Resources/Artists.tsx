import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type ArtistCardProps = {
    name: string;
    recommend: string;
    profileSrc: string;
};
const ArtistCard = ({ name, recommend, profileSrc }: ArtistCardProps) => {
    return (
        <Card className="w-80 md:w-[20rem] h-full">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <img src={profileSrc} className="w-8 h-8 rounded-lg" />

                        <div>
                            <div>{name}</div>
                            <div className="text-sm text-muted-foreground">
                                {""}
                            </div>
                        </div>
                    </div>

                    <Badge variant="outline" className="ml-4 h-6">
                        {recommend}
                    </Badge>
                </CardTitle>
            </CardHeader>
        </Card>
    );
};

const artists = [
    {
        name: "Krenz Cushart",
        recommend: "Highly",
        profileSrc:
            "https://cdna.artstation.com/p/users/avatars/000/100/152/large/ac0999d49657ef1e2b9f1bbac39c4d22.jpg?1440079106",
    },
    {
        name: "Kim Jung GI",
        recommend: "Highly",
        profileSrc:
            "https://pbs.twimg.com/profile_images/1577581433773703169/hPae3q_5_400x400.jpg",
    },
];

export default function Artists() {
    return (
        <div className="flex gap-4 flex-wrap">
            {artists.map((artist) => (
                <ArtistCard
                    name={artist.name}
                    recommend={artist.recommend}
                    profileSrc={artist.profileSrc}
                />
            ))}

            {/* Krenz Cushart (rotating boxes thing)
            https://krenzcushart.gumroad.com/ Kim jung gi */}
        </div>
    );
}
