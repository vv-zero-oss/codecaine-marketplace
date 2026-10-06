
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Demo, DemoGroup } from "./demo";

export function OverlaysGallery() {
  return (
    <TooltipProvider>
      <DemoGroup title="Overlays & menus">
        <Demo name="Dropdown menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                Copy values
                <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>Rescan transitions</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>Export theme — soon</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>

        <Demo name="Context menu">
          <ContextMenu>
            <ContextMenuTrigger className="grid h-16 w-full place-items-center rounded-xl bg-surface-sunken shadow-hairline">
              <span className="type-caption">Right-click here</span>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Accept suggestion</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Reset timing</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>

        <Demo name="Menubar">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Export CSS</MenubarItem>
                <MenubarItem>Export tokens</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Timeline</MenubarItem>
                <MenubarItem>Inspector</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </Demo>

        <Demo name="Popover & hover card">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <p className="type-label">Scale</p>
              <p className="type-caption mt-1">
                0.97 is the dropdown open token. 0.8 over-pops.
              </p>
            </PopoverContent>
          </Popover>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost">Hover card</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <p className="type-caption">
                Settle time is derived from stiffness, damping and mass.
              </p>
            </HoverCardContent>
          </HoverCard>
        </Demo>

        <Demo name="Tooltip">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>Save changes to your codebase</TooltipContent>
          </Tooltip>
        </Demo>

        <Demo name="Dialog & alert dialog">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Discard edits?</DialogTitle>
                <DialogDescription>
                  Your timing changes haven’t been written to source.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="secondary">Cancel</Button>
                <Button variant="destructive">Discard</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Alert dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset all transitions?</AlertDialogTitle>
                <AlertDialogDescription>
                  Every scanned transition returns to its source value.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Demo>

        <Demo name="Sheet & drawer">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Inspector</SheetTitle>
                <SheetDescription>Duration, delay and easing for the selection.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary">Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Presets</DrawerTitle>
                <DrawerDescription>Pick a duration token.</DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </Demo>

        <Demo name="Command" className="w-full">
          <Command className="w-full">
            <CommandInput placeholder="Search transitions" />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Menu dropdown">
                <CommandItem>
                  Open
                  <CommandShortcut>250ms</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Close
                  <CommandShortcut>150ms</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Demo>

        <Demo name="Sonner toast">
          <Button variant="outline" onClick={() => toast.success("Values copied")}>
            Show sonner toast
          </Button>
          <Toaster position="bottom-center" />
        </Demo>
      </DemoGroup>
    </TooltipProvider>
  );
}
