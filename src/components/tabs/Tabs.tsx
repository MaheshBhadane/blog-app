import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const TabsDemo = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <Tabs defaultValue="account" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Step-1</TabsTrigger>
          <TabsTrigger value="password">Step-2</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Create you blog here..</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter blog title" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="subtitile">Subtitle</Label>
                <Input id="subtitile" placeholder="Enter blog subtitle" />
              </div>
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Enter blog content" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Is Editor Pick
                </label>
              </div>
              <div className="space-y-1">
                <Label htmlFor="author">Author</Label>
                <Input id="author" placeholder="Enter blog author" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="author_type">Author Type</Label>
                <Input id="author_type" placeholder="Enter blog author type" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid w-full lg:max-w-sm items-center gap-1.5">
                <Label htmlFor="picture">Picture</Label>
                <Input type="file" id="img" name="img" accept="image/*" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsDemo;
