import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Books from "./Books";
import Youtube from "./Youtube";
import Websites from "./Websites";
import Artists from "./Artists";

export default function ResourcesPage() {
    return (
        <div className="flex flex-col ml-8 mt-8 mr-8">
            <Tabs defaultValue="books" className="w-fit">
                <TabsList>
                    <TabsTrigger value="books">Books</TabsTrigger>
                    <TabsTrigger value="youtube">YouTube</TabsTrigger>
                    <TabsTrigger value="websites">Websites</TabsTrigger>
                    <TabsTrigger value="artists">Artists</TabsTrigger>
                </TabsList>
                <TabsContent value="youtube">
                    <Youtube />
                </TabsContent>
                <TabsContent value="books">
                    <Books />
                </TabsContent>
                <TabsContent value="websites">
                    <Websites />
                </TabsContent>
                <TabsContent value="artists">
                    <Artists />
                </TabsContent>
            </Tabs>
        </div>
    );
}
