import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Books from "./Books";
import Youtube from "./Youtube";
import Websites from "./Websites";
import Artists from "./Artists";
import { Typography } from "@/components/ui/typography";

export default function ResourcesPage() {
    return (
        <div className="flex flex-col px-2 md:px-8 mt-8 pb-8">
            <Tabs defaultValue="books" className="w-fit">
                <TabsList>
                    <TabsTrigger value="books">Books</TabsTrigger>
                    <TabsTrigger value="youtube">YouTube</TabsTrigger>
                    <TabsTrigger value="websites">Websites</TabsTrigger>
                    <TabsTrigger value="artists">Artists</TabsTrigger>
                </TabsList>
                <TabsContent value="youtube">
                    <div className="mt-6 mb-4">
                        <Typography variant="h1" as="h1">
                            Youtube
                        </Typography>
                    </div>
                    <Youtube />
                </TabsContent>
                <TabsContent value="books">
                    <div className="mt-6 mb-4">
                        <Typography variant="h1" as="h1">
                            Books
                        </Typography>
                    </div>
                    <Books />
                </TabsContent>
                <TabsContent value="websites">
                    <div className="mt-6 mb-4">
                        <Typography variant="h1" as="h1">
                            Websites
                        </Typography>
                    </div>
                    <Websites />
                </TabsContent>
                <TabsContent value="artists">
                    <div className="mt-6 mb-4">
                        <Typography variant="h1" as="h1">
                            Artists
                        </Typography>
                    </div>
                    <Artists />
                </TabsContent>
            </Tabs>
        </div>
    );
}
