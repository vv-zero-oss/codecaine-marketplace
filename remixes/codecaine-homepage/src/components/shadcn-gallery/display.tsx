
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SparklesIcon } from "lucide-react";
import { Demo, DemoGroup } from "./demo";

const ROWS = [
  { element: "Menu surface", property: "transform", duration: "250ms" },
  { element: "Menu surface", property: "opacity", duration: "250ms" },
  { element: "Caret", property: "rotate", duration: "150ms" },
];

export function DisplayGallery() {
  return (
    <DemoGroup title="Display & navigation">
      <Demo name="Card" className="w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Menu dropdown</CardTitle>
            <CardDescription>Two transitions found on this element.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="type-caption">Open 250ms · Close 150ms · smooth</p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline">Apply</Button>
          </CardFooter>
        </Card>
      </Demo>

      <Demo name="Alert" className="w-full">
        <Alert>
          <SparklesIcon />
          <AlertTitle>Off-grid duration</AlertTitle>
          <AlertDescription>300ms is not a duration token — use medium (250ms).</AlertDescription>
        </Alert>
      </Demo>

      <Demo name="Badge">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Menu surface</Badge>
        <Badge variant="destructive">Blocking</Badge>
      </Demo>

      <Demo name="Avatar & kbd">
        <Avatar>
          <AvatarFallback>RD</AvatarFallback>
        </Avatar>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Demo>

      <Demo name="Tabs" className="w-full">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="type-caption">Two transitions found.</p>
          </TabsContent>
          <TabsContent value="timeline">
            <p className="type-caption">Three tracks on a one-second ruler.</p>
          </TabsContent>
          <TabsContent value="suggestions">
            <p className="type-caption">One scale suggestion pending.</p>
          </TabsContent>
        </Tabs>
      </Demo>

      <Demo name="Accordion" className="w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="duration">
            <AccordionTrigger>Why 250ms?</AccordionTrigger>
            <AccordionContent>
              Medium is the standard open. Anything longer reads as sluggish on a dropdown.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="easing">
            <AccordionTrigger>Why this curve?</AccordionTrigger>
            <AccordionContent>
              cubic-bezier(.22, 1, .36, 1) — a strong ease-out. Never ease-in on UI.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Demo>

      <Demo name="Collapsible" className="w-full">
        <Collapsible className="w-full">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">Toggle details</Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <p className="type-caption mt-2">Delay 0ms · Fill mode both · Composite replace.</p>
          </CollapsibleContent>
        </Collapsible>
      </Demo>

      <Demo name="Breadcrumb & pagination" className="flex w-full flex-col gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Refine</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Menu dropdown</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>

      <Demo name="Table" className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Element</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((row) => (
              <TableRow key={row.property}>
                <TableCell>{row.element}</TableCell>
                <TableCell className="font-mono">{row.property}</TableCell>
                <TableCell className="tabular-nums">{row.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Demo>

      <Demo name="Progress, spinner & skeleton" className="flex w-full flex-col gap-3">
        <Progress value={62} />
        <div className="flex items-center gap-3">
          <Spinner />
          <span className="type-caption">Scanning…</span>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </Demo>

      <Demo name="Item & empty" className="flex w-full flex-col gap-3">
        <Item variant="outline">
          <ItemMedia>
            <SparklesIcon className="size-4" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Scale 0.97</ItemTitle>
            <ItemDescription>Suggested for the dropdown open.</ItemDescription>
          </ItemContent>
        </Item>
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No transitions found</EmptyTitle>
            <EmptyDescription>Rescan after the page settles.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Demo>

      <Demo name="Separator, scroll area & aspect ratio" className="flex w-full flex-col gap-3">
        <Separator />
        <ScrollArea className="h-24 w-full rounded-xl bg-surface-sunken p-3">
          <p className="type-caption">
            Durations and curves are tokens. Opens are slower than closes, and closes start from a
            nearer scale, by design. Borders are inset shadows, so a control never changes size
            between rest, hover and focus. Dark elevation is a light top edge, not a heavier drop.
          </p>
        </ScrollArea>
        <AspectRatio ratio={16 / 9} className="grid place-items-center rounded-xl bg-surface-sunken">
          <span className="type-caption">16 / 9</span>
        </AspectRatio>
      </Demo>
    </DemoGroup>
  );
}
