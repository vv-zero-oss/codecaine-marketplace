
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Demo, DemoGroup } from "./demo";

export function FormsGallery() {
  return (
    <DemoGroup title="Forms & controls">
      <Demo name="Button" note="variant → .btn-* skin">
        <Button>Publish</Button>
        <Button variant="outline">Reset</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="accent">Generate</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="link">Docs</Button>
        <Button disabled>Disabled</Button>
      </Demo>

      <Demo name="Button sizes" note="32 / 36 / 40">
        <Button size="sm" variant="outline">Small</Button>
        <Button size="default" variant="outline">Medium</Button>
        <Button size="lg" variant="outline">Large</Button>
      </Demo>

      <Demo name="Button group">
        <ButtonGroup>
          <Button variant="outline">Easing</Button>
          <ButtonGroupSeparator />
          <Button variant="outline">Springs</Button>
        </ButtonGroup>
      </Demo>

      <Demo name="Toggle & toggle group">
        <Toggle aria-label="Bold">Bold</Toggle>
        <ToggleGroup type="single" defaultValue="open">
          <ToggleGroupItem value="open">Open</ToggleGroupItem>
          <ToggleGroupItem value="close">Close</ToggleGroupItem>
        </ToggleGroup>
      </Demo>

      <Demo name="Input & textarea" className="flex flex-col gap-2">
        <Input placeholder="Menu dropdown" />
        <Textarea placeholder="What should this transition feel like?" />
      </Demo>

      <Demo name="Input group" className="flex flex-col gap-2">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>ms</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput placeholder="250" />
        </InputGroup>
      </Demo>

      <Demo name="Field" className="flex flex-col gap-2">
        <Field>
          <FieldLabel htmlFor="selector">Selector</FieldLabel>
          <Input id="selector" defaultValue=".wd-dd .wd-dd-menu" />
          <FieldDescription>Shown in the transition picker.</FieldDescription>
          <FieldError>No element matches this selector.</FieldError>
        </Field>
      </Demo>

      <Demo name="Select" className="flex flex-col gap-2">
        <Select defaultValue="smooth">
          <SelectTrigger>
            <SelectValue placeholder="Pick an easing" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Motion tokens</SelectLabel>
              <SelectItem value="smooth">Smooth ease out</SelectItem>
              <SelectItem value="inout">Ease in out</SelectItem>
              <SelectItem value="bouncy">Bouncy overshoot</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Demo>

      <Demo name="Native select" className="flex flex-col gap-2">
        <NativeSelect defaultValue="medium">
          <NativeSelectOption value="fast">fast — 150ms</NativeSelectOption>
          <NativeSelectOption value="medium">medium — 250ms</NativeSelectOption>
          <NativeSelectOption value="slow">slow — 400ms</NativeSelectOption>
        </NativeSelect>
      </Demo>

      <Demo name="Checkbox & radio" className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="snap" defaultChecked />
          <Label htmlFor="snap">Snap to grid</Label>
        </div>
        <RadioGroup defaultValue="easing" className="flex gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="easing" id="r-easing" />
            <Label htmlFor="r-easing">Easing</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="spring" id="r-spring" />
            <Label htmlFor="r-spring">Spring</Label>
          </div>
        </RadioGroup>
      </Demo>

      <Demo name="Switch">
        <Switch defaultChecked aria-label="Live preview" />
        <Label>Live preview</Label>
      </Demo>

      <Demo name="Slider" className="flex w-full flex-col gap-2">
        <Slider defaultValue={[250]} max={1000} step={25} aria-label="Duration" />
      </Demo>

      <Demo name="Input OTP">
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </Demo>
    </DemoGroup>
  );
}
