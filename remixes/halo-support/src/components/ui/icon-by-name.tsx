import {
  Bed, Briefcase, Cpu, Eye, Globe, Heart, Landmark, Layers, Mic, Newspaper, Compass, ShieldCheck,
  ShoppingBag, Signal, SquareTerminal, TrendingUp, Truck, Wallet, type LucideProps,
} from "lucide-react"

const ICONS = {
  bed: Bed, briefcase: Briefcase, cpu: Cpu, eye: Eye, globe: Globe, heart: Heart, landmark: Landmark,
  layers: Layers, mic: Mic, newspaper: Newspaper, compass: Compass, shield: ShieldCheck, bag: ShoppingBag,
  signal: Signal, terminal: SquareTerminal, trending: TrendingUp, truck: Truck, wallet: Wallet,
}

export function IconByName({ name, ...props }: { name: string } & LucideProps) {
  const Icon = ICONS[name as keyof typeof ICONS] ?? Layers
  return <Icon {...props} />
}
